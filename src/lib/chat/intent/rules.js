const N8N_WORKFLOW_URL = import.meta.env?.VITE_N8N_WEBHOOK_URL || "https://infojam.app.n8n.cloud/webhook/7486e492-de09-4764-bea5-8e63dbfe8deb";

const n8n_workflows = {
    tts: "https://infojam.app.n8n.cloud/webhook/ea6648bb-0f27-424e-8271-e67a16f4f1ac",
    lcc_dc: "https://infojam.app.n8n.cloud/webhook/1fdfa3a1-4b77-4d27-95a5-d82733f4cfed"
};

import { message } from "$lib/chat/message.js";


async function postToN8nWorkflow(payload, url) {
    if (!url) {
        throw new Error("N8N workflow URL is not configured. Set VITE_N8N_WEBHOOK_URL in your environment.");
    }

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
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
        id: "test",

        //permissions: ["staff"],

        match(text) {
            return text === "/test" || text.startsWith("/test ");
        },

        extract(text) {
            //await wait(500);
            return {
                message: text.replace(/^\/test\s*/, "")
            };
        },

        async run({ message: inputMessage }) {
            //await wait(500);
            //const m =;

            return message.create({
                role: "assistant",
                content: { text: inputMessage || "Test mode active. Type /test followed by text to test it." },
                type: "test",
            });
        }
    },
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

            return message.create({
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
            const result = await postToN8nWorkflow({ message: inputMessage || "" }, n8n_workflows.tts);

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
    },
{
        id: "cls_analytics_flow",

        match(text) {
            return text === "/cls analytics" || text.startsWith("/cls analytics ");
        },

        extract(text) {
            return {
                message: text.replace(/^\/cls analytics\s*/, "")
            };
        },

        async run({ message: inputMessage }) {
            return message.create({
                role: "assistant",
                content: {
                    text: "Starting CLS Analytics..."
                },
                //actions: [{action: "start_flow", flow_id: "cls_analytics_flow"}],
                type: "start_flow",
                flow_id: "cls_analytics_flow",
                intent_action: "start_flow"
            });
        }
    },
    {
        id: "start_lcc_dc",

        match(text) {
            return text === "hello" || text.startsWith("hello ");
        },

        extract(text) {
            return {
                message: text.replace(/^hello\s*/, "")
            };
        },

        async run({ message: inputMessage }) {
            return message.create({
                role: "assistant",
                content: {
                    text: "Hi Andy, let me get the data catalog started..."
                },
                //actions: [{action: "start_flow", flow_id: "cls_analytics_flow"}],
                type: "start_flow",
                flow_id: "start_lcc_dc",
                intent_action: "start_flow"
            });
        }
    },
    {
        id: "query_dc",

        match(text) {
            return text === "/dc" || text.startsWith("/dc ");
        },

        extract(text) {
            return {
                message: text.replace(/^\/dc\s*/, "")
            };
        },

        async run({ message: inputMessage }) {
            const result = await postToN8nWorkflow({ question: inputMessage || "Tell me what I can do with this search" }, n8n_workflows.lcc_dc);

            console.log("N8N workflow result:", result);

            return message.create({
                role: "assistant",
                content: {
                    text: result[0].choices[0].message.content,
                    data: result
                },
                type: "query_lcc_dc",
            });
        }
    },
    {
        id: "qrios_flow",
         match(text) {
            return text === "/qrios" || text.startsWith("/qrios ");
        },

        extract(text) {
            return {
                message: text.replace(/^\/qrios\s*/, "")
            };
        },
        async run({ message: inputMessage }) {
            return message.create({
                role: "assistant",
                content: {
                    text: "Starting QRIOS flow..."
                },
                //actions: [{action: "start_flow", flow_id: "qrios_flow"}],
                type: "start_flow",
                flow_id: "qrios_flow",
                intent_action: "start_flow"
            });
        }
    }
];
