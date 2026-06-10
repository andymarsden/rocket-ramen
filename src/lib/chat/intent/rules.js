export const rules = [
    {
        id: "echo",

        //permissions: ["staff"],

        match(text) {
            return text === "/echo" || text.startsWith("/echo ");
        },

        extract(text) {
            return {
                message: text.replace(/^\/echo\s*/, "")
            };
        },

        async run({ message }) {
            return {
                content: {
                    text: message || "Echo mode active. Type /echo followed by text to repeat it."
                },
                options: [],
                type: "echo"
            };
        }
    }];