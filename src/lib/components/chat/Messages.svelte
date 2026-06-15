<script>
    import { chatState } from "$lib/chat";
    import UserSimple from "./messages/UserSimple.svelte";
    import AssistantSimple from "./messages/AssistantSimple.svelte";
    import ThinkingSimple from "./messages/ThinkingSimple.svelte";
    import BiNumber from "./messages/bi/BiNumber.svelte";
    import BiPie from "./messages/bi/bi-pie.svelte";
    import BiBar from "./messages/bi/bi-bar.svelte";
    import BiLine from "./messages/bi/bi-line.svelte";
    import Test from "$lib/components/chat/messages/test.svelte";

    function getBiChartType(message) {
        const output = message?.content?.output;
        const dataOutput = message?.content?.data?.output;
        const firstArrayOutput = Array.isArray(message?.content?.data)
            ? message.content.data[0]?.output
            : null;

        return (
            output?.type ||
            dataOutput?.type ||
            firstArrayOutput?.type ||
            message?.content?.data?.type ||
            null
        );
    }

    function isPieChartMessage(message) {
        return getBiChartType(message) === "pie_chart";
    }

    function isBarChartMessage(message) {
        return getBiChartType(message) === "bar_chart";
    }

    function isLineChartMessage(message) {
        return getBiChartType(message) === "line_chart";
    }
</script>

<div class="min-h-0 flex-1 overflow-y-auto scroll-smooth">
    <div
        class="mx-auto w-full max-w-3xl px-4 py-8 md:px-6"
        style="padding-bottom: clamp(10rem, 50vh, 24rem);"
    >
        <div id="messages" class="flex flex-col gap-8">
            {#each chatState.messages as message}
                <div>
                    {#if message.type === "thinking"}
                        <ThinkingSimple {message} />
                        {:else if message.type === "test" && message.role === "assistant"}
                            <Test {message} />
                    {:else if message.type === "query_qrios_bi" && message.role === "assistant"}
                        {#if isPieChartMessage(message)}
                            <BiPie {message} />
                        {:else if isBarChartMessage(message)}
                            <BiBar {message} />
                        {:else if isLineChartMessage(message)}
                            <BiLine {message} />
                        {:else}
                            <BiNumber {message} />
                        {/if}
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
<!--  -->

<style>
   /* .fancy {
        position: relative;
        overflow: hidden;
        border: 2px solid rgba(255, 251, 20, 0.95);
        box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.08),
            0 0 24px rgba(255, 251, 20, 0.45),
            inset 0 0 18px rgba(255, 251, 20, 0.22);
        padding: 1rem;
    } */

    /* .fancy::before {
        content: "";
        position: absolute;
        inset: -12px;
        border-radius: calc(1rem + 12px);
        background: conic-gradient(from 0deg, #000000, #000000, #8b5cf6, #000000, #000000, #000000);
        filter: blur(18px);
        opacity: 0.7;
        animation: fancy-spin 1s linear infinite;
        z-index: -1;
    }

    @keyframes fancy-spin {
        to {
            transform: rotate(360deg);
        }
    } */
</style>
