import { message } from "./message.js";

let messages = $state([]);
let isTyping = $state(false);
let activeFlow = $state(null);
let conversationId = $state(null);
//let awaitResponse = $state(false);
let activeMessageId = $state(null);
let isTextAreaFocused = $state(false);
// let context = $state(null); 
//let data_context = $state(null); // New state variable for data context

let messageEventStream = $state([]); // {conversation_id:0, message_id:0, event_type:"", event_data:{}, timestamp:0,flow_id:0,value:""}  Will hold list of all message events, in a simple structure {messageId,eventType,eventData,timestamp} so we can track the history of events for each message. This will be useful for debugging and analytics. This is also where we save all the messages 

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

    get activeMessageId() {
        return activeMessageId;
    },

    get messageEventStream() {
        return messageEventStream;
    },

    get conversationId() {
        return conversationId;
    },

    setConversationId(newConversationId) {
        conversationId = newConversationId;
    },
    addMessageEvent({ conversation_id, message_id,event_type, event_data, value,flow_id,responding_to }) {
        messageEventStream.push({
            conversation_id: conversation_id,
            message_id: message_id,
            event_type: event_type,
            event_data: event_data,
            timestamp: Date.now(),
            flow_id: flow_id,
            value: value,
            responding_to:responding_to
        });
    },
    // Need to think about this.
    // // //Context 
    // // get context() {
    // //     return context;
    // // },

    // // setContext(newContext) {
    // //     context = newContext;
    // // },

    updateActiveMessageId(messageId) {
        activeMessageId = messageId;
    },

    addMessage(newMessage) {
        messages.push(newMessage);
    },

    updateMessage(messageId, updates) {
        messages = messages.map(existingMessage => {
            if (existingMessage.id !== messageId) {
                return existingMessage;
            }

            return {
                ...existingMessage,
                ...updates
            };
        });
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