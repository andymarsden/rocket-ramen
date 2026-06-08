<script>
    import { chatState } from "$lib/chat";
    import UserSimple from "./messages/UserSimple.svelte";
    import AssistantSimple from "./messages/AssistantSimple.svelte";
    import ThinkingSimple from "./messages/ThinkingSimple.svelte";
</script>
 <div class="min-h-0 flex-1 overflow-y-auto scroll-smooth">
<div
    class="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-8 md:px-6"
    style="padding-bottom: clamp(10rem, 50vh, 24rem);"
>
    <div id="messages">
        {#each chatState.messages as message}
            <div>
                {#if message.type === "thinking"}
                    <ThinkingSimple {message}/>
                {:else if message.role === "user"}
                    <UserSimple {message} />
                {:else}
                    <AssistantSimple {message} />
                {/if}
            </div>
        {/each}
    </div>
</div>
</div>
<style>
</style>
