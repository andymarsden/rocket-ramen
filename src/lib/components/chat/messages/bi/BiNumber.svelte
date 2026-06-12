<script>
	import { Badge } from "$lib/components/ui/badge/index.js";
	import { Skeleton } from "$lib/components/ui/skeleton/index.js";

	let { message } = $props();

	const label = $derived(message?.content?.number?.label ?? "Number of Hubs");
	const rawValue = $derived(message?.content?.number?.value ?? "81");
	const value = $derived( String(rawValue ?? ""));
</script>

<article class="">
	<p class="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
		Assistant
	</p>

	<div class="flex flex-wrap items-end justify-between gap-4 rounded-lg border border-border/60 bg-background/70 p-4">
		<div class="space-y-1">
			<p class="text-xs uppercase tracking-[0.18em] text-muted-foreground/90">{label}</p>
			{#if rawValue === "" || rawValue == null}
				<Skeleton class="h-8 w-28 rounded-md" />
			{:else}
				<p class="text-3xl font-semibold tracking-tight text-foreground">{value}</p>
			{/if}
		</div>

		<Badge variant="secondary" class="rounded-full">11th June 2026</Badge>
	</div>
</article>
