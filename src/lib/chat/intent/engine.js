import { rules } from "./rules.js";
import { chatState } from "$lib/chat";
export const intent = {

    async detect(text, conversationId = null) {
        const normalized = text.trim().toLowerCase();

        const intent = rules.find(intent =>
            intent.match(normalized)
        );
 
        if (!intent) {
            return {
                success: false,
                error: {
                    code: "INTENT_EXECUTION_FAILED",
                    message: "Sorry, I don't understand that command."
                },
                intent: null,
                payload: null,
                content: null
            };
        }

        const payload = intent.extract ? intent.extract(normalized): {};

        try {
            const content = await intent.run(payload);
            return {
                success: true,
                error: null,
                intent: intent.id,
                payload,
                content: content.content,
                type: content.type,
                role: content.role
                //content: response
            };
        } catch (error) {
            return {
                success: false,
                error: {
                    code: "INTENT_EXECUTION_FAILED",
                    message: error.message
                },
                intent: null,
                payload: null,
                content: null
            };
        }


    }
}