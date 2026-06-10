import { chatState } from "$lib/chat";

    import { intent } from "$lib/chat/intent/engine.js";
export const composer = {
    sendMessage: async function (text) {
        console.log("Composer: Sending message:", text);

         const userText = text;

        chatState.addUserMessage(userText);

        chatState.setTyping(true);

        //Detect intent using the intent engine
        const get_intent = await intent.detect(userText);

        console.log("Detected intent:", get_intent);

        let assistantResponse = "Sorry, I didn't understand that.";

        const thinkingMessage = chatState.addThinkingMessage();

        setTimeout(async () => {
            chatState.removeMessage(thinkingMessage.id);

            // chatState.addAssistantMessage(`You said: ${get_intent.payload.message}`);
            chatState.addAssistantMessage(`You said: ${userText}`);

            chatState.setTyping(false);
            // Wait for DOM updates after re-enabling before restoring focus.
            // await tick();
           // textareaRef?.focus();
           chatState.setTextAreaFocused(true);
        }, 600);

        return "test";
    }
};
// export function sendMessage(text) {
//     //const thinkingMessage = chatState.addThinkingMessage();
//     //chatState.addAssistantMessage(`You said: ${text}`);
  
// }
