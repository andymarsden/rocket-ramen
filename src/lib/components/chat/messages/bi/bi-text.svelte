<script>
	let { message } = $props();

	const textOutput = $derived.by(() => {
		const data = message?.content?.data;
		const output = message?.content?.output;

		if (output?.type === "text") {
			return output;
		}

		if (data?.output?.type === "text") {
			return data.output;
		}

		if (Array.isArray(data) && data[0]?.output?.type === "text") {
			return data[0].output;
		}

		if (data?.type === "text") {
			return data;
		}

		return null;
	});

	const title = $derived(textOutput?.title ?? "Insight");
	const content = $derived(textOutput?.content ?? "No narrative is available for this result.");
	const userMessage = $derived(textOutput?.userMessage ?? "");
</script>

<article>
	<p class="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">LCC DATA Assistant</p>

	<div class="rounded-lg border border-border/60 bg-background/70 p-4">
		{#if userMessage}
			<p class="text-xs uppercase tracking-[0.14em] text-muted-foreground/90">{userMessage}</p>
		{/if}

		<p class="mt-1 text-sm font-semibold text-foreground">{title}</p>
		<p class="mt-3 text-sm leading-6 text-foreground">{content}</p>
	</div>
</article>
