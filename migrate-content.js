import fs from 'fs';
import path from 'path';

const pages = [
  'community',
  'faq',
  'download',
  'grant-sponsors',
  'how-it-works',
  'notice',
  'privacy-policy',
  'terms-of-use',
  'trademark-disclaimer'
];

for (const page of pages) {
  const legacyPath = path.join(process.cwd(), 'legacy', page, 'index.html');
  const astroPath = path.join(process.cwd(), 'src', 'pages', `${page}.astro`);

  if (fs.existsSync(legacyPath) && fs.existsSync(astroPath)) {
    const legacyHtml = fs.readFileSync(legacyPath, 'utf-8');
    
    // Extract content between <div class="wrapper"> and </div> </div>
    // The regex looks for `<div class="wrapper">` and grabs everything until the closing footer tags basically
    const contentMatch = legacyHtml.match(/<div class="content">\s*<div class="wrapper">([\s\S]*?)<\/div>\s*<\/div>\s*<footer/i);
    
    if (contentMatch && contentMatch[1]) {
      let content = contentMatch[1].trim();
      
      // We also need to fix class="class" to work in Astro (it works natively, but we might want to wrap it)
      // Actually, standard HTML works perfectly inside Astro components.
      
      const title = page.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

      const newAstroContent = `---
import Layout from '../layouts/Layout.astro';
---
<Layout title="Handshake | ${title}">
  <section class="py-20 bg-white">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate prose-lg legacy-content">
      ${content}
    </div>
  </section>
</Layout>
`;
      fs.writeFileSync(astroPath, newAstroContent);
      console.log(`Migrated content for ${page}`);
    } else {
      console.log(`Could not find wrapper content in ${page}`);
    }
  }
}
