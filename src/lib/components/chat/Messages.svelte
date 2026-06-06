<script>
    let { messages = [] } = $props();
</script>

<div
    class="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-8 md:px-6"
    style="padding-bottom: clamp(10rem, 50vh, 24rem);"
>
    <div id="messages">
        {#each messages as message}
            <div>
                {#if message.type === "thinking"}
                    <em>Thinking...</em>
                {:else}
                    <p>{message.content}</p>
                {/if}
            </div>
        {/each}
    </div>
</div>

<style>
</style>
