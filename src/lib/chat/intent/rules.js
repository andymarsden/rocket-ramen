const N8N_WORKFLOW_URL = import.meta.env?.VITE_N8N_WEBHOOK_URL || "https://infojam.app.n8n.cloud/webhook/7486e492-de09-4764-bea5-8e63dbfe8deb";

const n8n_workflows = {
  tts: "https://infojam.app.n8n.cloud/webhook/7486e492-de09-4764-bea5-8e63dbfe8deb",
  llc_dc: "https://infojam.app.n8n.cloud/webhook/1fdfa3a1-4b77-4d27-95a5-d82733f4cfed"
};

import { message } from "$lib/chat/message.js";


async function postToN8nWorkflow(message,url) {
    if (!url) {
        throw new Error("N8N workflow URL is not configured. Set VITE_N8N_WEBHOOK_URL in your environment.");
    }

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
    });

    const rawText = await response.text();

    if (!response.ok) {
        throw new Error(`N8N workflow request failed (${response.status}): ${rawText || response.statusText}`);
    }

    try {
        return rawText ? JSON.parse(rawText) : {};
    } catch (error) {
        return { raw: rawText };
    }
}

export const rules = [
    {
        id: "echo",

        //permissions: ["staff"],

        match(text) {
            return text === "/echo" || text.startsWith("/echo ");
        },

        extract(text) {
            //await wait(500);
            return {
                message: text.replace(/^\/echo\s*/, "")
            };
        },

        async run({ message: inputMessage }) {
            //await wait(500);
            //const m =;

            return  message.create({
                role: "assistant",
                content: { text: inputMessage || "Echo mode active. Type /echo followed by text to repeat it." },
                type: "echo",
            });
        }
    },

{
        id: "query_qrios",

        //permissions: ["staff"],

        match(text) {
            return text === "/query" || text.startsWith("/query ");
        },

        extract(text) {
            //await wait(500);
            return {
                message: text.replace(/^\/query\s*/, "")
            };
        },

        async run({ message: inputMessage }) {
            const result = await postToN8nWorkflow(inputMessage || "",n8n_workflows.tts);

            console.log("N8N workflow result:", result);

            return message.create({
                role: "assistant",
                content: {
                    text: typeof result?.result === "string"
                        ? result.result
                        : JSON.stringify(result, null, 2),
                    data: result
                },
                type: "query_qrios_bi",
            })

        }
    }



];