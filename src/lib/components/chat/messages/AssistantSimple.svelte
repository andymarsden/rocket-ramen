<script>
	import { Button } from "$lib/components/ui/button/index.js";
	//import { chatState } from "$lib/chat";
	import { composer } from "$lib/chat/composer.js";

	let { message } = $props();

	let buttons = $state([
		{
			text: "Add as user message",
			value: "add_as_user_message",
			isSelected: false,
		},
		{
			text: "Copy to clipboard",
			value: "copy_to_clipboard",
			isSelected: false,
		},
	]);

	function addUserMessage(index) {
		const selectedButton = buttons[index];
		composer.sendMessage(selectedButton?.value);
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

	<!-- {#if message.options?.length}
		<Button variant="outline" size="sm" onclick={() => addUserMessage(0)}>
			Add as user message
		</Button>
	{/if} -->

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
