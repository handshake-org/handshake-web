from pathlib import Path
import re

SRC = Path("public/files/handshake.txt")
OUT = Path("public/files/handshake.pdf")

PAGE_W = 612
PAGE_H = 792
LEFT = 56
RIGHT = 56
TOP = 72
BOTTOM = 52
CONTENT_W = PAGE_W - LEFT - RIGHT

BODY_SIZE = 10.5
BODY_LEADING = 14
H1_SIZE = 22
H1_LEADING = 28
H2_SIZE = 15
H2_LEADING = 20
H3_SIZE = 12
H3_LEADING = 16
SMALL_SIZE = 9
TITLE_SIZE = 24
SUBTITLE_SIZE = 11

FONT_METRICS = {
    "F1": 0.53,  # Helvetica
    "F2": 0.56,  # Helvetica-Bold
}


def escape_pdf_text(text: str) -> str:
    return text.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")


def text_width(text: str, font: str, size: float) -> float:
    return len(text) * FONT_METRICS[font] * size


def wrap_paragraph(text: str, font: str, size: float, width: float) -> list[str]:
    words = text.split()
    if not words:
        return [""]

    output = []
    current = words[0]

    for word in words[1:]:
        candidate = f"{current} {word}"
        if text_width(candidate, font, size) <= width:
            current = candidate
        else:
            output.append(current)
            current = word

    output.append(current)
    return output


class PDFBuilder:
    def __init__(self) -> None:
        self.page_ops: list[str] = []
        self.current_ops: list[str] = []
        self.y = PAGE_H - TOP
        self.page_num = 0
        self.start_page()

    def start_page(self) -> None:
        self.page_num += 1
        self.current_ops = []
        self.y = PAGE_H - TOP

    def finish_page(self) -> None:
        footer = f"Handshake Design Notes | Page {self.page_num}"
        self.draw_text(LEFT, BOTTOM - 6, footer, "F1", SMALL_SIZE, gray=0.45)
        self.page_ops.append("\n".join(self.current_ops))

    def ensure_space(self, amount: float) -> None:
        if self.y - amount < BOTTOM + 16:
            self.finish_page()
            self.start_page()

    def draw_text(self, x: float, y: float, text: str, font: str, size: float, gray: float = 0.12) -> None:
        escaped = escape_pdf_text(text)
        self.current_ops.append(
            f"BT /{font} {size:.2f} Tf {gray:.3f} g 1 0 0 1 {x:.2f} {y:.2f} Tm ({escaped}) Tj ET"
        )

    def draw_rule(self, y: float, gray: float = 0.82) -> None:
        self.current_ops.append(f"q {gray:.3f} G 1 w {LEFT} {y:.2f} m {PAGE_W - RIGHT} {y:.2f} l S Q")

    def add_block(
        self,
        lines: list[str],
        font: str,
        size: float,
        leading: float,
        before: float = 0,
        after: float = 0,
        gray: float = 0.12,
    ) -> None:
        self.ensure_space(before + after + leading * max(1, len(lines)))
        self.y -= before
        for line in lines:
            self.draw_text(LEFT, self.y, line, font, size, gray=gray)
            self.y -= leading
        self.y -= after

    def build_pages(self, lines: list[str]) -> None:
        self.add_block(["Handshake"], "F2", TITLE_SIZE, 30, before=8, gray=0.05)
        self.add_block(["Design Notes / Whitepaper"], "F1", SUBTITLE_SIZE, 16, after=6, gray=0.38)
        self.add_block(
            [
                "Formatted PDF edition generated from the canonical handshake.txt source.",
                "This PDF is provided as a more readable companion to the original plain-text file.",
            ],
            "F1",
            BODY_SIZE,
            BODY_LEADING,
            before=10,
            after=10,
            gray=0.22,
        )
        self.draw_rule(self.y + 2)
        self.y -= 20

        for raw in lines:
            line = raw.rstrip()
            if not line.strip():
                self.y -= 6
                continue

            if line.startswith("# "):
                self.add_block([line[2:].strip()], "F2", H1_SIZE, H1_LEADING, before=12, after=4, gray=0.05)
                continue

            if line.startswith("## "):
                self.add_block([line[3:].strip()], "F2", H2_SIZE, H2_LEADING, before=10, after=2, gray=0.08)
                continue

            if line.startswith("### "):
                self.add_block([line[4:].strip()], "F2", H3_SIZE, H3_LEADING, before=8, after=2, gray=0.08)
                continue

            paragraph = re.sub(r"^[_*](.*)[_*]$", r"\1", line)
            wrapped = wrap_paragraph(paragraph, "F1", BODY_SIZE, CONTENT_W)
            self.add_block(wrapped, "F1", BODY_SIZE, BODY_LEADING, before=2, after=2, gray=0.12)

        self.finish_page()

    def write(self, output_path: Path) -> None:
        objects = [
            "<< /Type /Catalog /Pages 2 0 R >>",
            "",
            "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
            "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
        ]

        page_ids = []
        page_object_start = 5

        for index, content in enumerate(self.page_ops):
            page_id = page_object_start + index * 2
            content_id = page_id + 1
            page_ids.append(f"{page_id} 0 R")
            page_object = (
                f"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 {PAGE_W} {PAGE_H}] "
                f"/Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> "
                f"/Contents {content_id} 0 R >>"
            )
            stream = content.encode("latin-1", errors="replace")
            content_object = f"<< /Length {len(stream)} >>\nstream\n{content}\nendstream"
            objects.append(page_object)
            objects.append(content_object)

        objects[1] = f"<< /Type /Pages /Count {len(self.page_ops)} /Kids [{' '.join(page_ids)}] >>"

        header = "%PDF-1.4\n%\u00e2\u00e3\u00cf\u00d3\n"
        chunks = [header]
        offsets = [0]
        position = len(header.encode("latin-1", errors="replace"))

        for obj_id, obj in enumerate(objects, start=1):
            chunk = f"{obj_id} 0 obj\n{obj}\nendobj\n"
            offsets.append(position)
            chunks.append(chunk)
            position += len(chunk.encode("latin-1", errors="replace"))

        xref_pos = position
        chunks.append(f"xref\n0 {len(objects) + 1}\n")
        chunks.append("0000000000 65535 f \n")
        for offset in offsets[1:]:
            chunks.append(f"{offset:010d} 00000 n \n")
        chunks.append(f"trailer\n<< /Size {len(objects) + 1} /Root 1 0 R >>\nstartxref\n{xref_pos}\n%%EOF\n")

        output_path.write_bytes("".join(chunks).encode("latin-1", errors="replace"))


def main() -> None:
    text = SRC.read_text(encoding="utf-8")
    builder = PDFBuilder()
    builder.build_pages(text.splitlines())
    builder.write(OUT)
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
