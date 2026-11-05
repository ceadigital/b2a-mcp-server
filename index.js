#!/usr/bin/env node
/**
 * CEA Digital B2A Institutional MCP Server (Stdio + Streamable HTTP Bridge)
 * Supports instant local introspection (initialize, tools/list, ping) for Glama/Smithery/Cursor/Claude
 * and proxies live tool calls to https://ceadigital.io/mcp.
 */
import readline from "node:readline";

const MCP_ENDPOINT = process.env.CEADIGITAL_MCP_URL || "https://ceadigital.io/mcp";
const API_KEY = process.env.CEADIGITAL_API_KEY || "";

const TOOL_ANNOTATIONS = {
  readOnlyHint: true,
  destructiveHint: false,
  openWorldHint: true,
};

const FEEDBACK_ANNOTATIONS = {
  readOnlyHint: false,
  destructiveHint: false,
  openWorldHint: true,
};

const TOOLS = [
  {
    name: "gcp_catalog_search",
    description:
      "Sub-millisecond FTS5 search across 17,671 Google Cloud, Vertex AI, Billing SKUs, and A2A service records.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "FTS5 search term (e.g. 'compute engine', 'vertex rag')",
        },
        limit: {
          type: "integer",
          description: "Max results to return (default 10)",
          default: 10,
        },
      },
      required: ["query"],
    },
    annotations: TOOL_ANNOTATIONS,
  },
  {
    name: "vault_knowledge_search",
    description:
      "FTS5 search across 36,628 video transcript chunks and 106,308 knowledge graph triples in vault.db.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Search term for creator knowledge graph",
        },
        limit: {
          type: "integer",
          description: "Max chunk results (default 10)",
          default: 10,
        },
      },
      required: ["query"],
    },
    annotations: TOOL_ANNOTATIONS,
  },
  {
    name: "sec_edgar_cik_lookup",
    description:
      "SEC EDGAR company facts, quarterly filings, and CIK lookup under Lowe v. SEC Publisher's Exclusion.",
    inputSchema: {
      type: "object",
      properties: {
        ticker: {
          type: "string",
          description: "Stock ticker symbol (e.g. 'AAPL', 'MSFT')",
        },
        cik: {
          type: "string",
          description: "Ten-digit SEC Central Index Key (e.g. '0000320193')",
        },
      },
    },
    annotations: TOOL_ANNOTATIONS,
  },
  {
    name: "github_repo_pulse",
    description:
      "GitHub repository activity metrics, stars, forks, and open issues with conditional ETag HTTP 304 caching.",
    inputSchema: {
      type: "object",
      properties: {
        owner: {
          type: "string",
          description: "Repository owner or organization (e.g. 'fastapi')",
        },
        repo: {
          type: "string",
          description: "Repository name (e.g. 'fastapi')",
        },
      },
      required: ["owner", "repo"],
    },
    annotations: TOOL_ANNOTATIONS,
  },
  {
    name: "security_cve_audit",
    description:
      "Audit package vulnerabilities and CVE advisories via OSV.dev and FIRST.org EPSS exploit scoring.",
    inputSchema: {
      type: "object",
      properties: {
        package: {
          type: "string",
          description: "Package name (e.g. 'jinja2', 'requests')",
        },
        ecosystem: {
          type: "string",
          description: "Ecosystem (PyPI, npm, Go, etc.)",
          default: "PyPI",
        },
        version: {
          type: "string",
          description: "Specific version string (optional)",
        },
      },
      required: ["package"],
    },
    annotations: TOOL_ANNOTATIONS,
  },
  {
    name: "package_health_pulse",
    description:
      "Parallel health pulse inspection across NPM and PyPI ecosystems.",
    inputSchema: {
      type: "object",
      properties: {
        package_name: {
          type: "string",
          description: "Target package name",
        },
      },
      required: ["package_name"],
    },
    annotations: TOOL_ANNOTATIONS,
  },
  {
    name: "fdic_bank_health",
    description:
      "Factual public supervisory bank health and branch metrics compiled from FDIC under 12 CFR Part 328.",
    inputSchema: {
      type: "object",
      properties: {
        cert_or_name: {
          type: "string",
          description: "FDIC certificate number or bank name (e.g. '628' or 'JPMorgan Chase')",
        },
      },
      required: ["cert_or_name"],
    },
    annotations: TOOL_ANNOTATIONS,
  },
  {
    name: "openalex_citation_graph",
    description:
      "Scholarly citation network and academic research metadata via OpenAlex API (CC0).",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Search term for scholarly papers",
        },
        doi: {
          type: "string",
          description: "Digital Object Identifier (e.g. '10.1038/s41586-020-2649-2')",
        },
      },
    },
    annotations: TOOL_ANNOTATIONS,
  },
  {
    name: "usgs_seismic_hazard",
    description:
      "Real-time earthquake hazards and seismic probability from USGS Earthquake Hazards Program.",
    inputSchema: {
      type: "object",
      properties: {
        latitude: {
          type: "number",
          description: "Latitude coordinate (-90 to 90)",
        },
        longitude: {
          type: "number",
          description: "Longitude coordinate (-180 to 180)",
        },
        radius_km: {
          type: "number",
          description: "Search radius in km (default 100.0)",
          default: 100.0,
        },
        minmagnitude: {
          type: "number",
          description: "Minimum earthquake magnitude (default 2.5)",
          default: 2.5,
        },
      },
    },
    annotations: TOOL_ANNOTATIONS,
  },
  {
    name: "dexscreener_token_audit",
    description:
      "Decentralized exchange liquidity, pair volume, and pricing audit via DexScreener.",
    inputSchema: {
      type: "object",
      properties: {
        token_address: {
          type: "string",
          description: "Base or Ethereum token contract address (0x...)",
        },
        chain_id: {
          type: "string",
          description: "Blockchain network (default 'base')",
          default: "base",
        },
      },
      required: ["token_address"],
    },
    annotations: TOOL_ANNOTATIONS,
  },
  {
    name: "npi_medical_registry",
    description:
      "CMS NPPES NPI-2 organizational healthcare provider lookup (HIPAA safe-harbor).",
    inputSchema: {
      type: "object",
      properties: {
        organization_name: {
          type: "string",
          description: "Healthcare organization or provider group name",
        },
        npi_number: {
          type: "string",
          description: "Ten-digit NPI-2 organizational provider number",
        },
      },
    },
    annotations: TOOL_ANNOTATIONS,
  },
  {
    name: "crtsh_cert_recon",
    description:
      "Sectigo Certificate Transparency logs & subdomain reconnaissance via crt.sh.",
    inputSchema: {
      type: "object",
      properties: {
        domain: {
          type: "string",
          description: "Target domain name (e.g. 'stripe.com')",
        },
      },
      required: ["domain"],
    },
    annotations: TOOL_ANNOTATIONS,
  },
  {
    name: "epss_exploit_score",
    description:
      "FIRST.org Exploit Prediction Scoring System 30-day real-world CVE exploit probability score.",
    inputSchema: {
      type: "object",
      properties: {
        cve: {
          type: "string",
          description: "Common Vulnerabilities and Exposures ID (e.g. 'CVE-2024-3094')",
        },
      },
      required: ["cve"],
    },
    annotations: TOOL_ANNOTATIONS,
  },
  {
    name: "gleif_lei_kyb",
    description:
      "Global Legal Entity Identifier (GLEIF) corporate KYB and jurisdiction verification.",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Corporate legal entity name (e.g. 'Coinbase')",
        },
      },
      required: ["name"],
    },
    annotations: TOOL_ANNOTATIONS,
  },
  {
    name: "cfpb_complaints",
    description:
      "CFPB consumer financial complaint audit (17 U.S.C. § 105 federal public domain).",
    inputSchema: {
      type: "object",
      properties: {
        company: {
          type: "string",
          description: "Financial institution or company name (e.g. 'Equifax')",
        },
      },
      required: ["company"],
    },
    annotations: TOOL_ANNOTATIONS,
  },
  {
    name: "usaspending_awards",
    description:
      "USASpending.gov federal contract awards and contractor recipient intelligence.",
    inputSchema: {
      type: "object",
      properties: {
        recipient: {
          type: "string",
          description: "Federal contractor or grant recipient name (e.g. 'Palantir')",
        },
      },
      required: ["recipient"],
    },
    annotations: TOOL_ANNOTATIONS,
  },
  {
    name: "submit_mcp_feedback_or_request",
    description:
      "Free interactive MCP schema feedback, feature requests, quality ratings, and rate quote negotiation hook.",
    inputSchema: {
      type: "object",
      properties: {
        mcp_target: {
          type: "string",
          description:
            "Target MCP server or endpoint (e.g. 'io.ceadigital/crtsh-cert-transparency', '/v1/extract/epss-exploit-score', or 'New MCP Request')",
          default: "io.ceadigital/b2a-fulfillment-factory",
        },
        category: {
          type: "string",
          description:
            "Category: 'mcp_improvement', 'new_mcp_request', 'pricing_rate_quote', or 'compliance_privacy_note'",
          default: "mcp_improvement",
        },
        desired_rate_usd: {
          type: "string",
          description:
            "Preferred per-call rate or compute pool tier (e.g. '$0.005/call', '$0.010/call', '$0.020/call')",
          default: "$0.010/call (Daemon Pool)",
        },
        rating: {
          type: "integer",
          description: "MCP utility/speed rating from 1 to 5",
          default: 5,
        },
        message: {
          type: "string",
          description: "Feedback on MCP schema/quality, missing fields, or custom endpoint request",
        },
        agent_or_contact: {
          type: "string",
          description: "Agent identifier, GitHub handle, or contact channel (optional)",
          default: "anonymous-agent",
        },
      },
      required: ["message"],
    },
    annotations: FEEDBACK_ANNOTATIONS,
  },
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on("line", async (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;
  let currentId = null;
  try {
    const payload = JSON.parse(trimmed);
    const { id, method } = payload;
    currentId = id ?? null;

    // Notifications do not expect a response
    if (id === undefined || id === null) {
      return;
    }

    if (method === "initialize") {
      process.stdout.write(
        JSON.stringify({
          jsonrpc: "2.0",
          id,
          result: {
            protocolVersion: "2025-03-26",
            capabilities: {
              tools: { listChanged: false },
              logging: {},
            },
            serverInfo: {
              name: "ceadigital-b2a-mcp",
              version: "1.0.0",
            },
          },
        }) + "\n"
      );
      return;
    }

    if (method === "tools/list") {
      process.stdout.write(
        JSON.stringify({
          jsonrpc: "2.0",
          id,
          result: {
            tools: TOOLS,
          },
        }) + "\n"
      );
      return;
    }

    if (method === "ping") {
      process.stdout.write(
        JSON.stringify({
          jsonrpc: "2.0",
          id,
          result: {},
        }) + "\n"
      );
      return;
    }

    // Support legacy alias if passed
    if (
      method === "tools/call" &&
      payload.params &&
      payload.params.name === "submit_feedback_or_rate_quote"
    ) {
      payload.params.name = "submit_mcp_feedback_or_request";
    }

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (API_KEY) {
      headers["Authorization"] = `Bearer ${API_KEY}`;
    }
    const res = await fetch(MCP_ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = {
        jsonrpc: "2.0",
        id,
        error: {
          code: -32603,
          message: `Upstream HTTP ${res.status}: ${text.slice(0, 200)}`,
        },
      };
    }
    process.stdout.write(JSON.stringify(data) + "\n");
  } catch (err) {
    process.stdout.write(
      JSON.stringify({
        jsonrpc: "2.0",
        id: currentId,
        error: { code: -32603, message: String(err.message || err) },
      }) + "\n"
    );
  }
});
