import { chatState } from "$lib/chat";

    import { intent } from "$lib/chat/intent/engine.js";
export const composer = {
    sendMessage: async function (userText) {

        chatState.addUserMessage(userText);

        chatState.setTyping(true);

        //does it look like the user is trying to cancel or stop something?
        //is current flow?
        //is follow up question?
        //detect intent

        //Detect intent using the intent engine
        const get_intent = await intent.detect(userText);

        console.log("Detected intent:", get_intent);

        let assistantResponse = "";

        if(!get_intent.success) {
            assistantResponse = get_intent.error.message;
        }else{
            assistantResponse = get_intent.content.content.text;
        }

        const thinkingMessage = chatState.addThinkingMessage();

        await new Promise(resolve => setTimeout(resolve, 600));

        chatState.removeMessage(thinkingMessage.id);
        chatState.addAssistantMessage(assistantResponse);
        chatState.setTyping(false);
        chatState.setTextAreaFocused(true);

        return "test";
    }
};
// export function sendMessage(text) {
//     //const thinkingMessage = chatState.addThinkingMessage();
//     //chatState.addAssistantMessage(`You said: ${text}`);
  
// }
