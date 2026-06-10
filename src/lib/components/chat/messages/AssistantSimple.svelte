<script>
	import { Button } from "$lib/components/ui/button/index.js";
	import { chatState } from "$lib/chat";

	let { message } = $props();
	let buttons = $state([
		{
			text: "Add as user message",
			isSelected: false,
		},
		{
			text: "Copy to clipboard",
			isSelected: false,
		},
	]);

	function addUserMessage(index) {
		chatState.addUserMessage(message.text);
		buttons = buttons.map((button, buttonIndex) => ({
			...button,
			isSelected: buttonIndex === index,
		}));
	}

</script>

<article class="text-foreground text-[15px] leading-7">
	<p
		class="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide"
	>
		Assistant
	</p>

	<div
		class="assistant-markdown wrap-break-word"
		data-testid="assistant-markdown"
	>
		{message.text}
	</div>

	{#if message.options?.length}
		<Button variant="outline" size="sm" onclick={addUserMessage}>
			Add as user message
		</Button>
	{/if}

	<div class="mt-3 flex flex-wrap gap-2">
		{#each buttons as button, index}
			<Button
				variant={button.isSelected ? "default" : "outline"}
				size="sm"
				onclick={() => addUserMessage(index)}
			>
				{button.text}
			</Button>
		{/each}
	</div>
</article>
