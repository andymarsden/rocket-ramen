import { writable } from "svelte/store";

const store = writable({
    messages: [],
    isTyping: false
});

function update(fn) {
    store.update(fn);
}

export const chat = {
    subscribe: store.subscribe,

    addMessage(message) {
        update(function (state) {
            return {
                ...state,
                messages: [...state.messages, message]
            };
        });
    },

    setTyping(isTyping) {
        store.update(state => ({
            ...state,
            isTyping
        }));
    }
};

//https://chatgpt.com/c/6a0cc7ba-36a0-838c-beb7-027b8790531d