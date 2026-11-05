#!/usr/bin/env node
/**
 * CEA Digital B2A Institutional MCP Server (Stdio + Streamable HTTP Bridge)
 * Supports instant local introspection (initialize, tools/list, ping) for Glama/Smithery
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
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on("line", async (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;
  try {
    const payload = JSON.parse(trimmed);
    const { id, method } = payload;

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
    const data = await res.json();
    process.stdout.write(JSON.stringify(data) + "\n");
  } catch (err) {
    process.stdout.write(
      JSON.stringify({
        jsonrpc: "2.0",
        id: null,
        error: { code: -32603, message: String(err.message || err) },
      }) + "\n"
    );
  }
});
