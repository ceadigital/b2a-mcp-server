#!/usr/bin/env node
/**
 * CEA Digital B2A Institutional MCP Stdio-to-Streamable-HTTP Bridge
 * Bridges standard input/output JSON-RPC 2.0 messages directly to https://ceadigital.io/mcp
 */
import readline from "node:readline";

const MCP_ENDPOINT = process.env.CEADIGITAL_MCP_URL || "https://ceadigital.io/mcp";
const API_KEY = process.env.CEADIGITAL_API_KEY || "";

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
    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
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
