<script>

    import AppHeader from "$lib/components/appshell/app-header.svelte";


    import ChatComposer from "$lib/components/chat/ChatComposer.svelte";
    import Messages from "$lib/components/chat/Messages.svelte";

    import { chatState } from "$lib/chat";


    
</script>

<AppHeader crumbs={[{ label: "Sandbox", href: "/app" },]} currentPage="Qrios"/>

<main class="bg-background flex h-dvh min-h-0 flex-1 flex-col">
    <section class="relative flex min-h-0 flex-1 flex-col">
       
 <Messages />     

            <ChatComposer/>
    </section>
</main>
