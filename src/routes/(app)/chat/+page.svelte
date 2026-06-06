<script>
    //KEEP

    import AppHeader from "$lib/components/sidenav/app-header.svelte";
    import { chatState } from "$lib/chat";

    import ChatComposer from "$lib/components/chat/ChatComposer.svelte";
    import Messages from "$lib/components/chat/Messages.svelte";

    function handleSend(text) {
        const userText = text;

        chatState.addUserMessage(userText);

        chatState.setTyping(true);

        const thinkingMessage = chatState.addThinkingMessage();

        setTimeout(() => {
            chatState.removeMessage(thinkingMessage.id);

            chatState.addAssistantMessage(`You said: ${userText}`);

            chatState.setTyping(false);
        }, 600);
    }
    //CONSIDER
    let textareaRef = $state(null);
    let messageListRef = $state(null);





    let isThinking = $state(false);


    import { Badge } from "$lib/components/ui/badge/index.js";


 
</script>

<AppHeader crumbs={[{ label: "Sandbox", href: "/app" },]} currentPage="Qrios"/>

<main class="bg-background flex h-dvh min-h-0 flex-1 flex-col">
    <section
        class="relative flex min-h-0 flex-1 flex-col">
        <div
            class="min-h-0 flex-1 overflow-y-auto scroll-smooth"
            id="message-list"
        >
            <div
                class="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-8 md:px-6"
                style="padding-bottom: clamp(10rem, 50vh, 24rem);"
            >
                <Messages messages={chatState.messages} />
            </div>
        </div>
                <ChatComposer
                    send={handleSend}
                    on:clear={() => chatState.clearMessages()}
                />
            </section>
</main>
