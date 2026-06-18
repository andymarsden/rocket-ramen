<script>
    //#region _top
    //#endregion _top

    //#region Imports
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import { Textarea } from "$lib/components/ui/textarea/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
    import { onMount, tick } from "svelte";
    //#endregion

    import { chatState, composer } from "$lib/chat";
    import { intent } from "$lib/chat/intent/engine.js";


    //#region Props
    //let { send } = $props();
    //#endregion

    //#region Event handlers

    async function send(){
        const text = draft.trim();
        if (!text) return;
        await composer.sendMessage(text);
        draft = "";
        console.log("Message sent:", text);
    }

    async function handleSubmit(event) {
        event?.preventDefault();

        const text = draft.trim();
        if (!text) return;

        await send();
    }

    async function handleComposerKeydown(event) {
        if (event.key !== "Enter") return;
        if (event.shiftKey) return;

        event.preventDefault();
        await send();
    }

    function clearMessages() {
        chatState.clearMessages();
    }
    //#endregion

    //#region Constants
    const MAX_TEXTAREA_HEIGHT = 224;
    //#endregion

    //#region Local state
    let textareaRef = $state(null);
    let draft = $state("");
    //#endregion

    onMount(() => {
        tick().then(() => {
            textareaRef?.focus();
        });
    });

    //#region Helpers
    function autoResizeTextarea() {
        if (!textareaRef) return;

        textareaRef.style.height = "auto";

        const nextHeight = Math.min(
            textareaRef.scrollHeight,
            MAX_TEXTAREA_HEIGHT,
        );
        textareaRef.style.height = `${nextHeight}px`;
        textareaRef.style.overflowY =
            textareaRef.scrollHeight > MAX_TEXTAREA_HEIGHT ? "auto" : "hidden";
    }
    //#endregion

    //#region Effects
    $effect(() => {
        draft;
        autoResizeTextarea();
    });

    $effect(() => {
        if (!chatState.isTextAreaFocused) return;

        tick().then(() => {
            textareaRef?.focus();
            chatState.setTextAreaFocused(false);
        });
    });
    //#endregion
</script>

<div
    class="from-background via-background/95 to-background sticky bottom-0 border-t bg-linear-to-t px-3 pb-3 pt-4 md:px-6 md:pb-2"
>
    <!-- Composer form wrapper -->
    <form class="relative mx-auto w-full max-w-3xl" onsubmit={handleSubmit}>
        <div
            class="bg-card ring-ring/30 focus-within:ring-ring rounded-3xl border p-2 shadow-sm transition-shadow focus-within:ring-2"
        >
            <div class="flex items-center gap-2">
                <Textarea
                    id="porto-input"
                    bind:ref={textareaRef}
                    bind:value={draft}
                    onkeydown={handleComposerKeydown}
                    rows="1"
                    class="h-9 max-h-56 min-h-0 flex-1 resize-none border-0 bg-transparent px-3 py-1.5 text-base shadow-none focus-visible:ring-0 md:text-sm"
                    placeholder="Type a message..."
                    aria-describedby="composer-hint"
                    //disabled={chatState.isTyping}
                />

                <!-- <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        {#snippet child({ props })}
                            <Button variant="ghost" size="icon-sm" class="rounded-full" disabled={isThinking} {...props}>
                                <ChevronsUpDownIcon class="size-4" />
                            </Button>
                        {/snippet}
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Content side="top" align="end" sideOffset={8} class="w-40 rounded-lg">
                        <DropdownMenu.Item>Live 1.5.2</DropdownMenu.Item>
                        <DropdownMenu.Item>Preview 2.3</DropdownMenu.Item>
                        <DropdownMenu.Item>Test 2.6.1</DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root> -->

                <Button
                    type="submit"
                    size="icon-sm"
                    class="rounded-full"
                    disabled={!draft.trim() || chatState.isTyping}
                >
                    {#if chatState.isTyping}
                        <span
                            class="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-r-transparent"
                            aria-hidden="true"
                        ></span>
                    {:else}
                        ↑
                    {/if}
                </Button>
            </div>
        </div>

        <p class="text-muted-foreground mt-2 px-2 text-center text-xs">
            Enter sends. Shift + Enter adds a new line.
        </p>
    </form>
</div>

<style>
    /* Add composer-specific styles here if needed. */
</style>
