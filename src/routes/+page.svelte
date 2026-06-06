<script>
    import { chatState } from "$lib/chat";
    import ChatComposer from "$lib/components/chat/ChatComposer.svelte";

    function handleSend(text) {

        const userText = text;

        chatState.addUserMessage(userText);

        chatState.setTyping(true);

        const thinkingMessage = chatState.addThinkingMessage();

        setTimeout(() => {
            chatState.removeMessage(thinkingMessage.id);

            chatState.addAssistantMessage(
                `You said: ${userText}`
            );

            chatState.setTyping(false);
        }, 600);
    }
</script>

<section>
    <h1>Chat</h1>

    <div class="messages">
        {#each chatState.messages as message}
            <div class="message {message.role} {message.type}">
                {#if message.type === "thinking"}
                    <em>Thinking...</em>
                {:else}
                    <p>{message.content}</p>
                {/if}
            </div>
        {/each}
    </div>

    <ChatComposer
        send={handleSend}
        on:clear={() => chatState.clearMessages()}
    />
</section>

<style>
    section {
        max-width: 700px;
        margin: 2rem auto;
        font-family: system-ui, sans-serif;
    }

    .messages {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin-bottom: 1rem;
    }

    .message {
        padding: 0.75rem 1rem;
        border-radius: 0.75rem;
        background: #f3f3f3;
    }

    .message.user {
        align-self: flex-end;
        background: #dbeafe;
    }

    .message.assistant {
        align-self: flex-start;
        background: #f3f4f6;
    }

    .message.error {
        background: #fee2e2;
    }
</style>