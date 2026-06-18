<script>
    import { onMount } from "svelte";
    import AppHeader from "$lib/components/appshell/app-header.svelte";

    import ChatComposer from "$lib/components/chat/ChatComposer.svelte";
    import Messages from "$lib/components/chat/Messages.svelte";
 import { Button } from "$lib/components/ui/button/index.js";
    import { chatState } from "$lib/chat";

    function dumpMessageState() {
        // console.log("Active Flow:", chatState.activeFlow);
        // console.log("Active Message ID:", chatState.activeMessageId);
        // console.log("Messages:", chatState.messages);
        console.log("Message Event Stream:", $state.snapshot(chatState.messageEventStream));
    }

    onMount(() => {
        const newConversationId = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        chatState.setConversationId(newConversationId);
    });
</script>

<AppHeader crumbs={[{ label: "STAT", href: "/app" }]} currentPage="Chat" />

<main class="bg-background flex h-dvh min-h-0 flex-1 flex-col">
    <section class="relative flex min-h-0 flex-1 flex-col">

Current Flow: {chatState.activeFlow ? chatState.activeFlow.id : "None"}<br>

Active Message ID: {chatState.activeMessageId ? chatState.activeMessageId : "None"}<br>
Conversation ID: {chatState.conversationId ? chatState.conversationId : "None"}<br>
<Button onclick={dumpMessageState}>Dump Message State</Button>
        <Messages/>

        <!-- {#if chatState.activeFlow}
            <div class="absolute top-0 left-0 right-0 z-10 bg-background p-4 shadow-md">
                <p class="text-sm text-muted-foreground">Current Flow: {chatState.activeFlow.id}</p>
            </div>
        {/if} -->
        <ChatComposer />
    </section>
</main>

<style>
 
</style>
 <!-- #ff1493, #8b5cf6, #22d3ee, #ff1493); -->