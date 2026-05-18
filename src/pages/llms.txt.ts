export const GET = async () => {
  const content = `# Handshake (HNS) - LLM Context

Handshake is a decentralized naming and certificate authority. It provides an alternate root zone for the open internet, moving away from centralized authorities.

## Key Resources
- Website: https://handshake.org
- Documentation: https://handshake-org.github.io
- GitHub (Full Node): https://github.com/handshake-org/hsd
- SPV Resolver: https://github.com/handshake-org/hnsd
- Community Wallet: https://bobwallet.org/

## Technical Details
- It uses a UTXO-based blockchain with Proof-of-Work to manage root zone file changes.
- The HNS coin is used to register and update internet names via a transparent on-chain Vickrey auction process.
- The protocol enables cryptographic name proofs, with the potential for decentralized proof lookups to be usually within the MTU limit.
- True decentralization: no official singular Foundation, Committee, Corporation, or entities in permanent unitary control of the protocol.
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};