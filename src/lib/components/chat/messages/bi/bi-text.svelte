<script>
	import { CircleHelp, Table2 } from "@lucide/svelte";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";

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

    console.log("assumptions........", message?.content.data.assumptions);

	const assumptions = $derived.by(() => {
		const rawAssumptions = message?.content.data.assumptions ?? message?.assumptions;



		if (Array.isArray(rawAssumptions)) {
			return rawAssumptions
				.map((item) => String(item ?? "").trim())
				.filter((item) => item.length > 0);
		}

		if (typeof rawAssumptions === "string") {
			const trimmed = rawAssumptions.trim();
			if (!trimmed) {
				return [];
			}

			try {
				const parsed = JSON.parse(trimmed);
				if (Array.isArray(parsed)) {
					return parsed
						.map((item) => String(item ?? "").trim())
						.filter((item) => item.length > 0);
				}
			} catch {
				return [trimmed];
			}

			return [trimmed];
		}

		return [];
	});
</script>

<article>
	<p class="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">LCC DATA Assistant</p>

	<div class="rounded-lg border border-border/60 bg-background/70 p-4">
		<!-- {#if userMessage}
			<p class="text-xs uppercase tracking-[0.14em] text-muted-foreground/90">{userMessage}</p>
		{/if} -->

		<div class="mt-1 flex items-start justify-between gap-3">
			<p class="pr-2 text-sm font-semibold text-foreground">{title}</p>

			<div class="flex shrink-0 items-center justify-end gap-2">
				<button
					type="button"
					class="inline-flex items-center gap-2 rounded-md border border-border/70 bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted"
				>
					<Table2 class="size-4" />
					<span>View data</span>
				</button>

				<Tooltip.Root>
					<Tooltip.Trigger>
						{#snippet child({ props })}
							<button
								type="button"
								class="inline-flex items-center gap-1 rounded-md border border-border/70 bg-background px-2 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted"
								aria-label="View assumptions"
								{...props}
							>
								<CircleHelp class="size-4" />
								<span>Assumptions</span>
							</button>
						{/snippet}
					</Tooltip.Trigger>
					<Tooltip.Content side="top" align="end" class="max-w-sm">
						{#if assumptions.length}
							<ul class="list-disc pl-4">
								{#each assumptions as assumption}
									<li>{assumption}</li>
								{/each}
							</ul>
						{:else}
							<span>No assumptions provided.</span>
						{/if}
					</Tooltip.Content>
				</Tooltip.Root>
			</div>
		</div>

		<p class="mt-3 text-sm leading-6 text-foreground">{content}</p>
	</div>
</article>
