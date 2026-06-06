<script>

    import AppHeader from "$lib/components/appshell/app-header.svelte";


    import ChatComposer from "$lib/components/chat/ChatComposer.svelte";
    import Messages from "$lib/components/chat/Messages.svelte";

    import { chatState } from "$lib/chat";

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


    let isThinking = $state(false);





 
</script>

<AppHeader crumbs={[{ label: "Sandbox", href: "/app" },]} currentPage="Qrios"/>

<main class="bg-background flex h-dvh min-h-0 flex-1 flex-col">

    <section class="relative flex min-h-0 flex-1 flex-col">

        <div class="min-h-0 flex-1 overflow-y-auto scroll-smooth">

                <Messages messages={chatState.messages} />
        
        </div>
    
                <ChatComposer send={handleSend} on:clear={() => chatState.clearMessages()} />

    </section>

</main>
