<script>
    let { messages = [] } = $props();
</script>

<div id="messages" >
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

<style>

</style>
