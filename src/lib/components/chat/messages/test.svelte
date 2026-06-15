<script>
	import * as Accordion from "$lib/components/ui/accordion/index.js";
	import { Badge } from "$lib/components/ui/badge/index.js";
    import Button from "$lib/components/ui/button/button.svelte";
	import MessageSquareTextIcon from "@lucide/svelte/icons/message-square-text";
	import FileLineChartIcon from "@lucide/svelte/icons/file-line-chart";
	import Bot from "@lucide/svelte/icons/bot";
</script>

<article class="text-foreground text-[15px] leading-7">
	<p
		class="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide"
	>
		Assistant
	</p>
	<div class="assistant-markdown wrap-break-word markdown-body pt-4 pb-4 mb-4">

		<p>Ive found some things you maybe interested in</p>
		<p>There are a few highway maintenance datasets in the catalog that cover potholes and related road defects. The most directly relevant ones track pothole repair requests, defect reports, inspections, repair actions and completion dates, which should help with maintenance planning, backlog monitoring and contractor performance.</p>
		<hr>
		<h3>Recommended assets</h3>
		<Accordion.Root
			type="single"
			class="w-full"
			value="item-1"
		>
			<Accordion.Item value="item-1">
				<Accordion.Trigger>
					<span class="flex flex-1 items-center gap-2">
						<strong>[1] Road Defects Register Dataset</strong>
						<Badge
							variant="outline"
							class="ml-auto mr-2 border-teal-300 bg-teal-200 text-teal-950"
						>
							dataset
						</Badge>
					</span>
				</Accordion.Trigger>
				<Accordion.Content class="flex flex-col gap-4 text-balance">
					<p>
						Our flagship product combines cutting-edge technology
						with sleek design. Built with premium materials, it
						offers unparalleled performance and reliability.
					</p>
					<p>
						Key features include advanced processing capabilities,
						and an intuitive user interface designed for both
						beginners and experts.
					</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-2">
				<Accordion.Trigger>
					<span class="flex flex-1 items-center gap-2">
						<strong>[2] Highways Pothole Repair Requests Dataset</strong>
						<Badge variant="outline" class="ml-auto mr-2 border-yellow-300 bg-yellow-200 text-black">PBI Report</Badge>
					</span>
				</Accordion.Trigger>
				<Accordion.Content class="flex flex-col gap-4 text-balance mt-2">
					<p>
						Dataset of pothole defect reports, inspection outcomes, repair actions and completion dates.

						
					</p>
					<ul class="!list-none !p-0 !m-0">
							<li><strong>Data Source:</strong> CONFIRM</li>
							<li><strong>Service Area:</strong> Highways Maintenance</li>
							<li><strong>Owner:</strong> Highway Asset Management Team</li>
						</ul>

					<h3>Why this is useful</h3>
					This is the strongest match for potholes if you want operational detail on defects and repairs. It includes recurring defect reports, urgent repair timing and maintenance backlogs.
					<h3>Questions this can help answer</h3>
					<ul class="!list-disc !pl-5">
						<li>Which roads have recurring defect reports?</li>
						<li>Are urgent defects repaired within target time?</li>
						<li>What maintenance backlogs are emerging?</li>
					</ul>
					<div class="flex items-center gap-2">
						<Button variant="outline"><MessageSquareTextIcon class="size-4" />Contact Owner</Button>
						<Button variant="outline"><FileLineChartIcon class="size-4" />View Report</Button>
						<Button variant="outline" class="glass-border-button"><Bot class="size-4" /></Button>
					</div>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-3">
				<Accordion.Trigger>
					<span class="flex flex-1 items-center gap-2">
						<strong>[3] Highways Pothole Repairs Dataset</strong>
						<Badge variant="outline" class="ml-auto mr-2 border-yellow-300 bg-yellow-200 text-black">PBI Report</Badge>
					</span>
				</Accordion.Trigger>
				<Accordion.Content class="flex flex-col gap-4 text-balance">
					<p>
						We stand behind our products with a comprehensive 30-day
						return policy. If you&apos;re not completely satisfied,
						simply return the item in its original condition.
					</p>
					<p>
						Our hassle-free return process includes free return
						shipping and full refunds processed within 48 hours of
						receiving the returned item.
					</p>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
		<hr>
		<h3>You may also be interested in</h3>
		<p>These assets are related to your request</p>
			<Accordion.Root
			type="single"
			class="w-full"
			value="item-1"
		>
			<Accordion.Item >
				<Accordion.Trigger>
					<span class="flex flex-1 items-center gap-2">
						<strong>[a] Traffic Flow Dashboard </strong>
						<Badge
							variant="outline"
							class="ml-auto mr-2 border-teal-300 bg-teal-200 text-teal-950"
						>
							dataset
						</Badge>
					</span>
				</Accordion.Trigger>
				<Accordion.Content class="flex flex-col gap-4 text-balance">
					<p>
						Our flagship product combines cutting-edge technology
						with sleek design. Built with premium materials, it
						offers unparalleled performance and reliability.
					</p>
					<p>
						Key features include advanced processing capabilities,
						and an intuitive user interface designed for both
						beginners and experts.
					</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item >
				<Accordion.Trigger>
					<span class="flex flex-1 items-center gap-2">
						<strong>[b] Skid Resistance Dataset </strong>
						<Badge variant="outline" class="ml-auto mr-2 border-yellow-300 bg-yellow-200 text-black">PBI Report</Badge>
					</span>
				</Accordion.Trigger>
				<Accordion.Content class="flex flex-col gap-4 text-balance">
					<p>
						We offer worldwide shipping through trusted courier
						partners. Standard delivery takes 3-5 business days,
						while express shipping ensures delivery within 1-2
						business days.
					</p>
					<p>
						All orders are carefully packaged and fully insured.
						Track your shipment in real-time through our dedicated
						tracking portal.
					</p>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	</div>
</article>


<style>
	:global(:root) {
		--glass-bg: rgba(255, 255, 255, 0.7);
		--glass-hover: rgba(255, 255, 255, 0.9);
		--glass-surface: #ffffff;
		--glass-surface-hover: #f7f7fb;
		--glass-text: #111;
	}

	:global(.dark) {
		--glass-bg: rgba(255, 255, 255, 0.08);
		--glass-hover: rgba(255, 255, 255, 0.12);
		--glass-surface: #13151b;
		--glass-surface-hover: #1b1f29;
		--glass-text: white;
	}
	:global(.glass-border-button) {
		height: 1.9rem;
		position: relative;
		padding-left: 0.625rem;
		padding-right: 0.625rem;
		border: 1px solid transparent;
		border-radius: 8px;

		color: var(--glass-text);
		background:
			linear-gradient(var(--glass-surface), var(--glass-surface))
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

		font-weight: 600;
		font-size: 14px;

		cursor: pointer;
		overflow: hidden;

		backdrop-filter: blur(14px);
		animation: borderMove 16s ease-in-out infinite;

		transition:
			transform 0.2s ease,
			background 0.2s ease;
	}

	:global(.glass-border-button:hover) {
		/* transform: translateY(-1px); */
		background:
			linear-gradient(
					var(--glass-surface-hover),
					var(--glass-surface-hover)
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
	}

	@keyframes borderMove {
		0% {
			background-position:
				0 0,
				0% 50%;
		}

		20% {
			background-position:
				0 0,
				100% 20%;
		}

		40% {
			background-position:
				0 0,
				80% 100%;
		}

		60% {
			background-position:
				0 0,
				20% 80%;
		}

		80% {
			background-position:
				0 0,
				120% 40%;
		}

		100% {
			background-position:
				0 0,
				0% 50%;
		}
	}
</style>