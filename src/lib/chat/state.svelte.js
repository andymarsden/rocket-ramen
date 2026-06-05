import { message } from "./message.js";

let messages = $state([]);
let isTyping = $state(false);
let activeFlow = $state(null);

export const chatState = {
    get messages() {
        return messages;
    },

    get isTyping() {
        return isTyping;
    },

    get activeFlow() {
        return activeFlow;
    },

    addMessage(newMessage) {
        messages.push(newMessage);
    },

    addUserMessage(content) {
        const newMessage = message.user(content);
        messages.push(newMessage);

        return newMessage;
    },

    addAssistantMessage(content) {
        const newMessage = message.assistant(content);
        messages.push(newMessage);

        return newMessage;
    },

    addThinkingMessage() {
        const newMessage = message.thinking();
        messages.push(newMessage);

        return newMessage;
    },

    removeMessage(messageId) {
        messages = messages.filter(message => {
            return message.id !== messageId;
        });
    },

    setTyping(value) {
        isTyping = value;
    },

    startFlow(flowId) {
        activeFlow = {
            id: flowId,
            currentStepIndex: 0,
            answers: {}
        };
    },

    clearFlow() {
        activeFlow = null;
    },

    clearMessages() {
        messages = [];
    }
};