export const message = {
    create({
        role,
        content = "",
        type = "text",
        status = "complete",
        options = [],
        actions = [],
        metadata = {}
    }) {
        return {
            id: crypto.randomUUID(),

            role,           // user, assistant, system
            type,           // text, card, chart, form, thinking
            status,         // pending, thinking, complete, error

            content,
            options,
            actions,
            metadata,
        };
    },

    user(content) {
        return this.create({
            role: "user",
            content
        });
    },

    assistant(content) {
        return this.create({
            role: "assistant",
            content
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