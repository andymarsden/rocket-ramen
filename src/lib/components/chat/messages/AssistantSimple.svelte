<script>
	import { Button } from "$lib/components/ui/button/index.js";
	import { chatState } from "$lib/chat";
	import { composer } from "$lib/chat/composer.js";
	import { marked } from "marked";

	import "github-markdown-css/github-markdown.css";

	let { message } = $props();

	let activeMessageId = $derived(chatState.activeMessageId);

	// Parse markdown content


	import DOMPurify from "dompurify";

	marked.use({
		gfm: true,
		breaks: true,
	});

	const htmlContent = $derived(
		DOMPurify.sanitize(marked.parse(message?.content?.text || ""))
	);

	//const htmlContent = marked(message.content.text);
	// let buttons = $state([
	// 	{
	// 		text: "Add as user message",
	// 		value: "add_as_user_message",
	// 		isSelected: false,
	// 	},
	// 	{
	// 		text: "Copy to clipboard",
	// 		value: "copy_to_clipboard",
	// 		isSelected: false,
	// 	},
	// ]);

	function addUserMessage(index) {
		const selectedButton = message.options[index];
		composer.sendMessage(selectedButton?.value);
		const updatedOptions = message.options.map((button, buttonIndex) => ({
			...button,
			isSelected: buttonIndex === index,
		}));

		chatState.updateMessage(message.id, { options: updatedOptions });
	}
</script>

<article class="text-foreground text-[15px] leading-7">
	<p
		class="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide"
	>
		Assistant
	</p>
	<div class="assistant-markdown wrap-break-word markdown-body">
		{@html htmlContent}
	</div>

	<div class="mt-3 flex flex-wrap gap-2">
		{#each message.options as button, index}
			<Button
				variant={button.isSelected ? "default" : "outline"}
				size="sm"
				disabled= {activeMessageId !== message.id}
				onclick={() => addUserMessage(index)}
				class="cursor-pointer"
			>
				{button.text}
			</Button>
		{/each}
	</div>
</article>

<style>
	:global(.assistant-markdown.markdown-body) {
		background-color: hsl(var(--background));
		color: hsl(var(--foreground));
	}

	:global(.dark .assistant-markdown.markdown-body) {
		background-color: hsl(var(--background));
		color: hsl(var(--foreground));
	}
</style>
