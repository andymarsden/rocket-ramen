<script>
    import AppHeader from "$lib/components/appshell/app-header.svelte";

    import ChatComposer from "$lib/components/chat/ChatComposer.svelte";
    import Messages from "$lib/components/chat/Messages.svelte";

    import { chatState } from "$lib/chat";
</script>

<AppHeader crumbs={[{ label: "STAT", href: "/app" }]} currentPage="Chat" />

<main class="bg-background flex h-dvh min-h-0 flex-1 flex-col">
    <section class="relative flex min-h-0 flex-1 flex-col">

Current Flow: {chatState.activeFlow ? chatState.activeFlow.id : "None"}<br>

Active Message ID: {chatState.activeMessageId ? chatState.activeMessageId : "None"}
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