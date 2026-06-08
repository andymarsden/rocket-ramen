import { message } from "./message.js";

let messages = $state([]);
let isTyping = $state(false);
let activeFlow = $state(null);
let conversationId = $state(null);
let awaitResponse = $state(false);


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

    addUserMessage(text) {
        const newMessage = message.user(text);
        messages.push(newMessage);

        return newMessage;
    },

    addAssistantMessage(text) {
        const newMessage = message.assistant(text);
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