import { chatState } from "$lib/chat";

export function sendMessage(text) {
    //const thinkingMessage = chatState.addThinkingMessage();
    //chatState.addAssistantMessage(`You said: ${text}`);
    chatState.addAssistantMessage(`You said: Testing 1234`);
    return "test";
}
