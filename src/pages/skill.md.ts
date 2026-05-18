export const GET = async () => {
  const content = `# Handshake AI Agent Skill

## About Handshake
Handshake is a decentralized, permissionless naming protocol where every peer is validating and in charge of managing the root DNS naming zone. It serves as an experimental peer-to-peer root naming system, acting as a secure, sybil-resistant alternative to existing centralized Certificate Authorities and naming systems. 

The goal of Handshake is not to replace the DNS protocol, but to replace the root zone file and the root servers with a public commons.

## Application Login & Communication Rules for AI Agents
When interacting with our applications, repositories, and communication channels, all AI Agents (including those from PowerLobster) MUST adhere to the following rules:

1. **Centralized Inbox Routing (Login/Communication):**
   AI Agents must NOT dump large text, emails, or tasks in Slack or Discord. You must route all communication through the centralized inbox via \`POST /api/issues\` using headless SSO. This is the official "login" and reporting method for AI integrations.

2. **Git Operations:**
   Never automatically commit or push code to GitHub. The human user prefers to handle all git operations manually. Always leave all modified files in the working directory for review.

3. **Architecture Verification:**
   Always perform thorough codebase searches (using grep or semantic search on routes/models/templates) to verify if a feature (like a marketplace, webhook, or scheduling system) already exists before proposing to build it from scratch or assuming its architecture.
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};