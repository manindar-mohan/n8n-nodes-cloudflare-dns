# Agent Instructions for Cloudflare DNS n8n Node

## Project Structure
This is an n8n community node for integrating with Cloudflare DNS API.

## Key Commands
- `npm run build` - Build the TypeScript project and copy icons
- `npm run dev` - Watch mode for development  
- `npm run lint` - Run ESLint checks
- `npm run format` - Format code with Prettier

## Testing the Node
1. Build: `npm run build`
2. Link locally: `npm link`
3. In n8n installation: `npm link n8n-nodes-cloudflare-dns`
4. Start n8n: `n8n start`

## File Structure
- `nodes/CloudflareDns/` - Main node implementation
  - `CloudflareDns.node.ts` - Node logic with 4 operations (list, create, update, delete)
  - `CloudflareDns.node.json` - Node metadata
  - `cloudflare.svg` - Node icon
- `credentials/CloudflareDnsApi.credentials.ts` - API authentication handling
- `package.json` - npm package configuration with n8n-specific settings

## Key Features
- List DNS records with filtering options
- Create new DNS records (A, AAAA, CNAME, MX, TXT, NS, SRV, PTR)
- Update existing DNS records
- Delete DNS records
- Support for all common DNS record fields (TTL, proxied, priority, etc.)

## Authentication
Uses Cloudflare API Token with Bearer authentication.
