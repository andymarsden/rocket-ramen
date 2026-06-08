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
        isValidated = true
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
            isValidated
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