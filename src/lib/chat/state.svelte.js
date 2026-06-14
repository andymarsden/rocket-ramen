import { message } from "./message.js";

let messages = $state([]);
let isTyping = $state(false);
let activeFlow = $state(null);
let conversationId = $state(null);
let awaitResponse = $state(false);
let isTextAreaFocused = $state(false);
// let context = $state(null); 
//let data_context = $state(null); // New state variable for data context


export const chatState = {
    get messages() {
        return messages;
    },

    get isTyping() {
        return isTyping;
    },

    get isTextAreaFocused() {
        return isTextAreaFocused;
    },

    get activeFlow() {
        return activeFlow;
    },


    // Need to think about this.
    // // //Context 
    // // get context() {
    // //     return context;
    // // },

    // // setContext(newContext) {
    // //     context = newContext;
    // // },

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

    setTextAreaFocused(value) {
        isTextAreaFocused = value;
    },

    startFlow(flow) {
        activeFlow = flow;
    },

    clearFlow() {
        activeFlow = null;
    },

    clearMessages() {
        messages = [];
    }
};