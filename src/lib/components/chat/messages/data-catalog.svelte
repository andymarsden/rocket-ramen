<script>
	let { message } = $props();
	import Button from "$lib/components/ui/button/button.svelte";
	import { buttonVariants } from "$lib/components/ui/button/index.js";
	import MessageSquareTextIcon from "@lucide/svelte/icons/message-square-text";
	import FileLineChartIcon from "@lucide/svelte/icons/file-line-chart";
	import SquareCodeIcon from "@lucide/svelte/icons/square-code";
	import Bot from "@lucide/svelte/icons/bot";

	import * as Sheet from "$lib/components/ui/sheet/index.js";

	import * as Accordion from "$lib/components/ui/accordion/index.js";
	import { Badge } from "$lib/components/ui/badge/index.js";


	import { composer } from "$lib/chat/composer.js";

	import { marked } from "marked";

	
	function toArray(value) {
		return Array.isArray(value) ? value : [];
	}


	function sendUserMessage(text){
		console.log('sending user message:', text);
		composer.sendMessage(text);
	}

	const catalogMessage = $derived.by(() => {
		const rawMessage =
			typeof message === "string"
				? message
				: typeof message?.content?.text === "string"
					? message.content.text
					: typeof message?.content === "string"
						? message.content
						: typeof message?.text === "string"
							? message.text
							: "";

		if (!rawMessage) {
			return null;
		}

		try {
			const parsed = JSON.parse(rawMessage);
			return parsed && typeof parsed === "object" ? parsed : null;
		} catch {
			return null;
		}
	});

	const recommendedAssets = $derived(
		toArray(catalogMessage?.recommended_assets),
	);
	const relatedAssets = $derived(
		toArray(catalogMessage?.assets_you_maybe_interested_in),
	);
	const followUpQuestions = $derived(
		toArray(catalogMessage?.follow_up_questions),
	);

	function badgeClass(assetType) {
		const normalized = (assetType || "").toLowerCase();
		if (normalized === "model") {
			return "ml-auto mr-2 border-blue-300 bg-blue-100 text-blue-900";
		}

		return "ml-auto mr-2 border-teal-300 bg-teal-200 text-teal-950";
	}
</script>

<article class="text-foreground text-[15px] leading-7">
	<p
		class="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide"
	>
		LCC DATA Assistant
	</p>
	<div
		class="assistant-markdown wrap-break-word markdown-body pt-4 pb-4 mb-4"
	>
		{#if catalogMessage}
			{#if catalogMessage.initial_comment}
				<p>{catalogMessage.initial_comment}</p>
			{/if}

			{#if catalogMessage.justification_text}
				<p>{catalogMessage.justification_text}</p>
			{/if}

			{#if recommendedAssets.length > 0}
				<hr />
				<h3>Recommended assets</h3>
				<Accordion.Root type="single" class="w-full" collapsible>
					{#each recommendedAssets as asset, index}
						<Accordion.Item value={`recommended-${index}`}>
							<Accordion.Trigger>
								<span class="flex flex-1 items-center gap-2">
									<strong
										>[{index + 1}] {asset.asset_name}</strong
									>
									<span
										class="ml-auto flex items-center gap-2"
									>
										{#if asset.has_agent === true}
											<Badge
												variant="outline"
												class="border-green-300 bg-green-100 text-black glass-border-badge"
											>
												Agent
											</Badge>
										{/if}

										{#if asset.asset_type}
											<Badge
												variant="outline"
												class={badgeClass(
													asset.asset_type,
												)}
											>
												{asset.asset_type}
											</Badge>
										{/if}
									</span>
								</span>
							</Accordion.Trigger>
							<Accordion.Content
								class="flex flex-col gap-4 text-balance mt-2"
							>
								<div class="flex items-center gap-2">
									<Button
										class="transition-colors"
										variant="outline"
										><MessageSquareTextIcon
											class="size-4"
										/>Contact Owner</Button
									>

									<Button variant="outline"
										><FileLineChartIcon
											class="size-4"
										/>View Asset</Button
									>

									<Sheet.Root>
										<Sheet.Trigger
											class={`${buttonVariants({ variant: "outline" })} inline-flex items-center gap-2`}
										>
											<SquareCodeIcon class="size-4" />
											<span>Metadata</span>
										</Sheet.Trigger>
										<Sheet.Content>
											<Sheet.Header>
												<Sheet.Title
													>{asset.asset_name}</Sheet.Title
												>
												<Sheet.Description>
												
													{#if asset.meta_data}
													<div class="assistant-markdown wrap-break-word markdown-body">
		{@html marked.parse(asset.meta_data || "")}
	</div>
														
													{/if}
												</Sheet.Description>
											</Sheet.Header>
										</Sheet.Content>
									</Sheet.Root>
									{#if asset.has_agent === true}
										<Button
											variant="outline"
											onclick={() => sendUserMessage(`/cls analytics ${asset.asset_name}`)}
											class="glass-border-button"
											><Bot class="size-4" /></Button
										>
									{/if}
								</div>

								{#if asset.short_description}
									<p>{asset.short_description}</p>
								{/if}

								<ul class="list-none! p-0! m-0!">
									{#if asset.service_area}
										<li>
											<strong>Service Area:</strong>
											{asset.service_area}
										</li>
									{/if}
									{#if asset.owner}
										<li>
											<strong>Owner:</strong>
											{asset.owner}
										</li>
									{/if}
								</ul>

								{#if asset.why_this_is_useful}
									<div>
										<h3>Why this is useful</h3>
										<p>{asset.why_this_is_useful}</p>
									</div>
								{/if}

								{#if toArray(asset.questions_it_can_answer).length > 0}
									<div>
										<h3>Questions this can help answer</h3>
										<ul class="list-disc! pl-5!">
											{#each toArray(asset.questions_it_can_answer) as question}
												<li>{question}</li>
											{/each}
										</ul>
									</div>
								{/if}

								<!-- <div class="flex flex-wrap gap-2">
									{#if asset.link_to_asset}
										<a
											href={asset.link_to_asset}
											target="_blank"
											rel="noreferrer"
											class="inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
										>
											View asset
										</a>
									{/if}
									{#if asset.link_to_metadata}
										<a
											href={asset.link_to_metadata}
											target="_blank"
											rel="noreferrer"
											class="inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
										>
											View metadata
										</a>
									{/if}
								</div> -->
							</Accordion.Content>
						</Accordion.Item>
					{/each}
				</Accordion.Root>
			{/if}

			{#if relatedAssets.length > 0}
				<hr />
				<h3>You may also be interested in</h3>
				<Accordion.Root type="single" class="w-full" collapsible>
					{#each relatedAssets as asset, index}
						<Accordion.Item value={`related-${index}`}>
							<Accordion.Trigger>
								<span class="flex flex-1 items-center gap-2">
									<strong
										>[{String.fromCharCode(97 + index)}] {asset.asset_name}</strong
									>
								</span>
							</Accordion.Trigger>
							<Accordion.Content
								class="flex flex-col gap-4 text-balance mt-2"
							>
								<ul class="list-none! p-0! m-0!">
									{#if asset.owner}
										<li>
											<strong>Owner:</strong>
											{asset.owner}
										</li>
									{/if}
								</ul>

								{#if asset.why_its_related}
									<p>{asset.why_its_related}</p>
								{/if}
							</Accordion.Content>
						</Accordion.Item>
					{/each}
				</Accordion.Root>
			{/if}

			{#if followUpQuestions.length > 0}
				<hr />
				<h3>Follow-up questions</h3>
				<ul class="list-disc! pl-5!">
					{#each followUpQuestions as followUpQuestion}
						<li>{followUpQuestion}</li>
					{/each}
				</ul>
			{/if}
		{:else}
			<p>Unable to render data catalog content from this message.</p>
		{/if}
	</div>
</article>

<style>
	:global(.glass-border-badge) {
		position: relative;
		border: 2px solid transparent;
		background:
			linear-gradient(
					var(--glass-surface, #ffffff),
					var(--glass-surface, #ffffff)
				)
				padding-box,
			linear-gradient(
					122deg,
					#ff00aa,
					#ff5e5e,
					#ffdd00,
					#ff66cc,
					#ffee55,
					#ff00aa
				)
				border-box;
		background-size:
			100% 100%,
			400% 400%;
		background-position:
			0 0,
			0% 50%;
		backdrop-filter: blur(14px);
		animation: borderMove 16s ease-in-out infinite;
	}

	:global(.dark) {
		--glass-surface: #13151b;
	}

	:global(.assistant-markdown.markdown-body) {
		background-color: hsl(var(--background));
		color: hsl(var(--foreground));
	}

	:global(.dark .assistant-markdown.markdown-body) {
		background-color: hsl(var(--background));
		color: hsl(var(--foreground));
	}

	@keyframes borderMove {
		0% {
			background-position:
				0 0,
				0% 50%;
		}
		50% {
			background-position:
				0 0,
				100% 50%;
		}
		100% {
			background-position:
				0 0,
				0% 50%;
		}
	}
</style>
