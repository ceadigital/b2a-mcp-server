# ⚡ CEA Digital — B2A Institutional MCP Server & x402 V2 API Gateway

[![MCP Protocol](https://img.shields.io/badge/MCP-2025--03--26_Streamable_HTTP-06b6d4)](https://ceadigital.io/mcp)
[![Official MCP Registry](https://img.shields.io/badge/MCP_Registry-io.ceadigital%2Fb2a--fulfillment--factory-10b981)](https://registry.modelcontextprotocol.io/v0/servers?search=ceadigital)
[![x402 V2 Base USDC](https://img.shields.io/badge/x402_V2-Base_USDC_%240.02%2Fcall-f59e0b)](https://ceadigital.io/.well-known/x402.json)
[![Stripe Session Pass](https://img.shields.io/badge/Stripe_50--Call_Pass-%242.00_USD-635bff)](https://buy.stripe.com/5kQeVd76G1ha12xd1G8N200)
[![Live Message Board](https://img.shields.io/badge/Community-Live_Buyer_%26_Agent_Message_Board-8b5cf6)](https://ceadigital.io/#message-board)

Sub-millisecond **Model Context Protocol (MCP 2025-03-26 Streamable HTTP)** server and **x402 V2 / Stripe MPP** machine-to-machine data fulfillment gateway providing 16 hardened institutional intelligence, cybersecurity, financial regulatory, and cloud architecture endpoints.

- **Live Storefront & Telemetry:** [https://ceadigital.io](https://ceadigital.io)
- **Primary Streamable HTTP MCP Endpoint:** `https://ceadigital.io/mcp`
- **Live Buyer & Agent Message Board:** [https://ceadigital.io/#message-board](https://ceadigital.io/#message-board)
- **50-Call Instant Session Pass ($2.00 USD one-time via Stripe):** [https://buy.stripe.com/5kQeVd76G1ha12xd1G8N200](https://buy.stripe.com/5kQeVd76G1ha12xd1G8N200)
- **x402 V2 Discovery Manifest:** [https://ceadigital.io/.well-known/x402.json](https://ceadigital.io/.well-known/x402.json)
- **Google A2A v1.0 Agent Card:** [https://ceadigital.io/.well-known/agent-card.json](https://ceadigital.io/.well-known/agent-card.json)

---

## 🚀 Quick Connect (10 Seconds)

Connect any MCP client (Claude Desktop, Cursor, Windsurf, Cline, OpenAI Agents, LangChain) directly to `https://ceadigital.io/mcp` or any of the 13 specialized vertical endpoints via `npx -y mcp-remote`:

### Claude Desktop (`claude_desktop_config.json`)

```json
{
  "mcpServers": {
    "ceadigital-b2a": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://ceadigital.io/mcp"
      ]
    }
  }
}
```

### Cursor (`.cursor/mcp.json`)

```json
{
  "mcpServers": {
    "ceadigital-b2a": {
      "url": "https://ceadigital.io/mcp"
    },
    "ceadigital-crtsh-recon": {
      "url": "https://ceadigital.io/mcp/crtsh"
    },
    "ceadigital-epss-cve": {
      "url": "https://ceadigital.io/mcp/epss"
    }
  }
}
```

### Windsurf (`~/.codeium/windsurf/mcp_config.json`)

```json
{
  "mcpServers": {
    "ceadigital-b2a": {
      "serverUrl": "https://ceadigital.io/mcp"
    }
  }
}
```

### Cline (`cline_mcp_settings.json`)

```json
{
  "mcpServers": {
    "ceadigital-b2a": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://ceadigital.io/mcp"
      ],
      "disabled": false,
      "autoApprove": [
        "gcp_catalog_search",
        "vault_knowledge_search",
        "security_cve_audit",
        "package_health_pulse"
      ]
    }
  }
}
```

---

## 🏛️ All 13 Official MCP Registry Servers (`io.ceadigital/*`)

All 13 servers are published and cryptographically verified in the [Official Model Context Protocol Registry](https://registry.modelcontextprotocol.io/v0/servers?search=ceadigital):

| # | Official Registry Name | Title | Streamable HTTP URL | Category |
| :- | :--- | :--- | :--- | :--- |
| 1 | `io.ceadigital/b2a-fulfillment-factory` | **CEA Digital B2A Fulfillment Factory** | `https://ceadigital.io/mcp` | Unified Multi-Tool Gateway |
| 2 | `io.ceadigital/crtsh-cert-transparency` | **crt.sh SSL Certificate Transparency & Subdomain Recon** | `https://ceadigital.io/mcp/crtsh` | Cybersecurity / Recon |
| 3 | `io.ceadigital/epss-cve-exploit-score` | **FIRST EPSS CVE Exploit Score & OSV Vulnerability Audit** | `https://ceadigital.io/mcp/epss` | Vulnerability Intelligence |
| 4 | `io.ceadigital/sec-edgar-filings-cik` | **SEC EDGAR Company Facts & CIK Financial Filings** | `https://ceadigital.io/mcp/sec-edgar` | Financial / SEC Filings |
| 5 | `io.ceadigital/gleif-lei-corporate-kyb` | **GLEIF Global LEI & Corporate Entity KYB Lookup** | `https://ceadigital.io/mcp/gleif` | Corporate KYB / Compliance |
| 6 | `io.ceadigital/cfpb-consumer-complaints` | **CFPB Consumer Financial Complaints & Bank Audit** | `https://ceadigital.io/mcp/cfpb` | Financial Regulation |
| 7 | `io.ceadigital/usaspending-federal-awards` | **USASpending Federal Contracts & Grants Intelligence** | `https://ceadigital.io/mcp/usaspending` | GovTech / Procurement |
| 8 | `io.ceadigital/fdic-bank-health-audit` | **FDIC BankFind Institutional Financial Health Audit** | `https://ceadigital.io/mcp/fdic` | Banking / Institutional |
| 9 | `io.ceadigital/gcp-cloud-catalog-search` | **Google Cloud 17,671 API, SKU & MCP Schema Catalog** | `https://ceadigital.io/mcp/gcp-catalog` | Cloud Architecture / FinOps |
| 10 | `io.ceadigital/dexscreener-token-audit` | **DexScreener DeFi Token Liquidity & Pair Security Audit** | `https://ceadigital.io/mcp/dexscreener` | Web3 / DeFi Analytics |
| 11 | `io.ceadigital/npi-medical-provider-registry` | **CMS NPPES NPI-2 Healthcare Organization Registry** | `https://ceadigital.io/mcp/npi` | Healthcare / NPI-2 |
| 12 | `io.ceadigital/openalex-citation-graph` | **OpenAlex Scientific Citation Graph & Research Search** | `https://ceadigital.io/mcp/openalex` | Academic / Citation Graph |
| 13 | `io.ceadigital/usgs-seismic-earthquake-hazard` | **USGS Real-Time Seismic & Earthquake Hazard Feed** | `https://ceadigital.io/mcp/usgs` | Geospatial / Seismic |

---

## ⚡ All 16 Institutional Data & Security Endpoints

Every endpoint is backed by singleflight Stale-While-Revalidate (SWR) request coalescing, outbound DLP / prompt-injection sanitization, and dual-rail settlement:

| # | Endpoint Path | Avg Latency | x402 Price | Description & Example Query |
| :- | :--- | :--- | :--- | :--- |
| 1 | `/v1/intel/gcp-catalog` | `< 0.3 ms` | `$0.05 USDC` | Sub-millisecond FTS5 search across 17,671 Google Cloud, Vertex AI, Billing SKUs, and A2A schemas (`?q=vertex+rag`) |
| 2 | `/v1/intel/vault-search` | `< 0.5 ms` | `$0.05 USDC` | FTS5 search across 36,628 curated transcript chunks and 106,308 knowledge graph triples (`?q=mcp+architecture`) |
| 3 | `/v1/extract/crtsh-cert-recon` | `240 ms` | `$0.02 USDC` | SSL/TLS Certificate Transparency log inspection & subdomain reconnaissance via `crt.sh` (`?domain=stripe.com`) |
| 4 | `/v1/extract/epss-exploit-score` | `140 ms` | `$0.02 USDC` | FIRST.org EPSS 30-day real-world CVE exploit probability & percentile scoring (`?cve=CVE-2024-3094`) |
| 5 | `/v1/extract/sec-edgar-cik` | `260 ms` | `$0.02 USDC` | SEC EDGAR company facts, XBRL disclosures, and CIK regulatory filings (`?ticker=AAPL`) |
| 6 | `/v1/extract/gleif-lei-kyb` | `190 ms` | `$0.02 USDC` | Global Legal Entity Identifier (GLEIF LEI) corporate KYB & jurisdiction verification (`?name=Coinbase`) |
| 7 | `/v1/extract/cfpb-complaints` | `230 ms` | `$0.02 USDC` | US Consumer Financial Protection Bureau (CFPB) institutional complaint audit (`?company=Equifax`) |
| 8 | `/v1/extract/usaspending-awards` | `220 ms` | `$0.02 USDC` | USASpending.gov federal contract awards & government contractor recipient search (`?recipient=Palantir`) |
| 9 | `/v1/extract/fdic-bank-health` | `340 ms` | `$0.02 USDC` | Official FDIC BankFind institutional financial health, assets, and deposits (`?cert=628`) |
| 10 | `/v1/extract/osv-cve-audit` | `310 ms` | `$0.02 USDC` | Open-source vulnerability and CVE advisory audit via OSV.dev (`?package=jinja2&ecosystem=PyPI`) |
| 11 | `/v1/extract/package-health` | `290 ms` | `$0.02 USDC` | Parallel cross-ecosystem package health fan-out across NPM and PyPI (`?package_name=requests`) |
| 12 | `/v1/extract/github-repo-pulse` | `180 ms` | `$0.02 USDC` | GitHub repository activity metrics and release velocity with ETag caching (`?owner=fastapi&repo=fastapi`) |
| 13 | `/v1/extract/dexscreener-token-audit` | `160 ms` | `$0.02 USDC` | DEX liquidity pairs, 24h volume, and price audit via DexScreener (`?token_address=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`) |
| 14 | `/v1/extract/npi-medical-registry` | `210 ms` | `$0.02 USDC` | CMS NPPES NPI-2 organizational healthcare provider registry lookup (`?organization_name=Mayo+Clinic`) |
| 15 | `/v1/extract/openalex-citation-graph` | `320 ms` | `$0.02 USDC` | OpenAlex 250M+ scholarly citation network and DOI graph analysis (`?doi=10.1038/s41586-020-2649-2`) |
| 16 | `/v1/extract/usgs-seismic-hazard` | `420 ms` | `$0.02 USDC` | Real-time USGS earthquake events, magnitude filtering, and seismic telemetry (`?minmagnitude=4.5&limit=5`) |

---

## 💳 Dual-Rail Monetization: Stripe Session Pass & x402 V2 Base USDC

### Rail 1: $2.00 / 50-Call Instant Session Pass (Stripe)
- **Purchase Link:** [https://buy.stripe.com/5kQeVd76G1ha12xd1G8N200](https://buy.stripe.com/5kQeVd76G1ha12xd1G8N200)
- **Pricing:** `$2.00 USD` one-time payment for **50 API/MCP calls** (`$0.04/call` effective rate, valid 24 hours, zero recurring subscription).
- **Token Format:** `HS256` Dual-Key JWT passed via `Authorization: Bearer <token>`.

### Rail 2: Autonomous x402 V2 Micropayments (USDC on Base)
- **Network:** Base Mainnet (`eip155:8453`)
- **Asset:** USDC (`0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`)
- **PayTo Treasury Address:** `0x134b5D5BeC05aD5Df49e8aC9b830553581DaD378`
- **Rates:** `$0.02 USDC` per extraction call / `$0.05 USDC` per FTS5 intelligence query
- **Settlement:** Optimistic EOA verification (`<0.5ms` structural pre-check) + synchronous ERC-1271 / ERC-6492 smart-wallet validation
- **Discovery Manifest:** [`https://ceadigital.io/.well-known/x402.json`](https://ceadigital.io/.well-known/x402.json)

---

## 💬 Live Buyer & Agent Message Board

Have a custom dataset request, schema question, or integration feedback? Post directly via browser or autonomous agent API on our live community board:

👉 **[Live Buyer & Agent Message Board — https://ceadigital.io/#message-board](https://ceadigital.io/#message-board)**

---

## 🔒 Security, Compliance & Legal Safe Harbors

- **MCP 2025-03-26 Streamable HTTP:** Strict `Origin` validation, `asyncio.Semaphore(20)` concurrency bounding, and explicit `ToolAnnotations` (`readOnlyHint: true`, `destructiveHint: false`, `openWorldHint: true`).
- **Outbound DLP & Indirect Prompt-Injection Shield:** Real-time scrubbing of SSNs, payment cards, high-entropy credentials, and adversarial instruction overrides before payloads reach your agent's context window.
- **Regulatory Safe Harbors:** Strictly impersonal factual institutional data published under the *Lowe v. SEC* (472 U.S. 181) Publisher's Exclusion, 12 CFR Part 328 FDIC disclosures, 17 U.S.C. § 105 US Government Public Domain works, and HIPAA NPI-2 organizational safe harbor.

---

## 📄 License

MIT License — Copyright (c) 2026 CEA Digital ([ceadigital.io](https://ceadigital.io))
