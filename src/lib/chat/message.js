export const message = {
    create({
        role,
        content = "",
        text = "",
        type = "text",
        status = "complete",
        options = [],
        actions = [],
        metadata = {},
        createdAt = new Date().toISOString(),
        isValidated = true,
        flow_id = null,
        //intent = null,
        intent_action = null
    }) {
        return {
            id: crypto.randomUUID(),
            role,           // user, assistant, system
            type,           // text, card, chart, form, thinking
            status,         // pending, thinking, complete, error
            text,
            content,
            options,
            actions,
            metadata,
            createdAt,
            isValidated,
            flow_id,
            //intent
            intent_action,
        };
    },

    user(text) {
        return this.create({
            role: "user",
            text
        });
    },

    assistant(text) {
        return this.create({
            role: "assistant",
            text
        });
    },

    thinking() {
        return this.create({
            role: "assistant",
            type: "thinking",
            status: "thinking",
            content: ""
        });
    },

    error(content = "Something went wrong") {
        return this.create({
            role: "assistant",
            type: "error",
            status: "error",
            content
        });
    }
};