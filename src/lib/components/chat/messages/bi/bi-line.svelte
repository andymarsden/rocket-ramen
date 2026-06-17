<script>
	import { onDestroy } from "svelte";
	import { Save } from "@lucide/svelte";
	import {
		CategoryScale,
		Chart as ChartJS,
		Legend,
		LineController,
		LineElement,
		LinearScale,
		PointElement,
		Title,
		Tooltip
	} from "chart.js";
	import { buttonVariants } from "$lib/components/ui/button/index.js";
	import * as Sheet from "$lib/components/ui/sheet/index.js";

	ChartJS.register(
		LineController,
		LineElement,
		PointElement,
		CategoryScale,
		LinearScale,
		Title,
		Tooltip,
		Legend
	);

	const monthFormatter = new Intl.DateTimeFormat("en-GB", {
		month: "short",
		year: "numeric"
	});

	const dashboardOptions = [
		{ value: "executive-overview", label: "Executive Overview" },
		{ value: "hub-performance", label: "Hub Performance" },
		{ value: "monthly-service-review", label: "Monthly Service Review" }
	];

	let chartCanvas = $state();
	let isSaveSheetOpen = $state(false);
	let selectedDashboard = $state("");
	let toastMessage = $state("");
	let isToastVisible = $state(false);
	let toastTimeout;

	let { message } = $props();

	const lineOutput = $derived.by(() => {
		const data = message?.content?.data;
		const output = message?.content?.output;

		if (output?.type === "line_chart") {
			return output;
		}

		if (data?.output?.type === "line_chart") {
			return data.output;
		}

		if (Array.isArray(data) && data[0]?.output?.type === "line_chart") {
			return data[0].output;
		}

		if (data?.type === "line_chart") {
			return data;
		}

		return null;
	});

	const title = $derived(lineOutput?.title ?? "Line Chart");
	const description = $derived(lineOutput?.description ?? "");

	const rows = $derived.by(() => (Array.isArray(lineOutput?.data) ? lineOutput.data : []));
	const xAxis = $derived(lineOutput?.x_axis ?? {});
	const yAxis = $derived(lineOutput?.y_axis ?? {});

	const points = $derived.by(() => {
		const xField = xAxis.field || "date";
		const yField = yAxis.field || "value";

		return rows
			.map((row) => {
				const rawLabel = String(row?.[xField] ?? row?.date ?? row?.category ?? "").trim();
				const value = Number(row?.[yField] ?? row?.value ?? 0);
				const timeValue = Date.parse(rawLabel);

				return {
					rawLabel,
					value,
					timeValue,
					hasTimeValue: Number.isFinite(timeValue)
				};
			})
			.filter((row) => row.rawLabel.length > 0 && Number.isFinite(row.value));
	});

	const normalizedPoints = $derived.by(() => {
		if (!points.length) {
			return [];
		}

		const nextPoints = [...points];
		const allDateValues = nextPoints.every((point) => point.hasTimeValue);

		if (allDateValues) {
			nextPoints.sort((a, b) => a.timeValue - b.timeValue);
		}

		return nextPoints;
	});

	const chartData = $derived.by(() => {
		if (!normalizedPoints.length) {
			return null;
		}

		return {
			labels: normalizedPoints.map((point) => {
				if (!point.hasTimeValue) {
					return point.rawLabel;
				}

				return monthFormatter.format(new Date(point.timeValue));
			}),
			datasets: [
				{
					label: yAxis.label || "Value",
					data: normalizedPoints.map((point) => point.value),
					borderColor: "rgb(3, 88, 101)",
					backgroundColor: "rgba(3, 88, 101, 0.2)",
					pointBackgroundColor: "rgb(3, 88, 101)",
					pointRadius: 4,
					pointHoverRadius: 6,
					tension: 0.3,
					fill: false,
					borderWidth: 2
				}
			]
		};
	});

	const options = $derived.by(() => ({
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false
			},
			title: {
				display: false
			}
		},
		scales: {
			x: {
				title: {
					display: Boolean(xAxis.label),
					text: xAxis.label || "Month"
				},
				grid: {
					display: false
				},
				border: {
					display: false
				}
			},
			y: {
				beginAtZero: true,
				title: {
					display: Boolean(yAxis.label),
					text: yAxis.label || "Value"
				},
				grid: {
					color: "#F1F3F7",
					borderDash: [1, 4]
				},
				border: {
					display: false
				}
			}
		}
	}));

	const showToast = (message) => {
		toastMessage = message;
		isToastVisible = true;

		clearTimeout(toastTimeout);
		toastTimeout = setTimeout(() => {
			isToastVisible = false;
		}, 2500);
	};

	const saveToDashboard = () => {
		if (!selectedDashboard) {
			return;
		}

		const selectedOption = dashboardOptions.find((dashboard) => dashboard.value === selectedDashboard);

		isSaveSheetOpen = false;
		showToast(`Saved to ${selectedOption?.label ?? "dashboard"}`);
	};

	onDestroy(() => {
		clearTimeout(toastTimeout);
	});

	$effect(() => {
		const data = chartData;
		const chartOptions = options;

		if (!chartCanvas || !data) {
			return;
		}

		const chart = new ChartJS(chartCanvas, {
			type: "line",
			data,
			options: chartOptions
		});

		return () => {
			chart.destroy();
		};
	});
</script>

<article>
	<p class="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">LCC DATA Assistant</p>

	<div class="rounded-lg border border-border/60 bg-background/70 p-4">
		{#if isToastVisible}
			<div
				class="mb-4 flex items-center justify-between rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900"
				role="status"
				aria-live="polite"
			>
				<span>{toastMessage}</span>
				<button
					type="button"
					class="ml-3 text-xs font-medium text-emerald-900/70 hover:text-emerald-900"
					onclick={() => (isToastVisible = false)}
				>
					Dismiss
				</button>
			</div>
		{/if}

		<div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
			<div>
				<p class="text-sm font-semibold text-foreground">{title}</p>
				{#if description}
					<p class="mt-1 text-xs text-muted-foreground">{description}</p>
				{/if}
			</div>
		</div>

		{#if chartData}
			<div class="mt-4 h-80">
				<canvas bind:this={chartCanvas}></canvas>
			</div>
		{:else}
			<p class="mt-4 text-sm text-muted-foreground">No chart data available.</p>
		{/if}

		<div class="mt-4 flex items-center justify-start">
			<Sheet.Root bind:open={isSaveSheetOpen}>
				<Sheet.Trigger class={`${buttonVariants({ variant: "outline" })} inline-flex items-center gap-2`}>
					<Save class="size-4" />
					<span>Save to dashboard</span>
				</Sheet.Trigger>
				<Sheet.Content side="right" class="w-full sm:max-w-md">
					<Sheet.Header>
						<Sheet.Title>Save to dashboard</Sheet.Title>
						<Sheet.Description>
							Choose a dashboard to save this chart to.
						</Sheet.Description>
					</Sheet.Header>

					<div class="px-4 py-6">
						<label class="mb-2 block text-sm font-medium text-foreground" for="dashboard-select">
							Dashboard
						</label>
						<select
							id="dashboard-select"
							bind:value={selectedDashboard}
							class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden"
						>
							<option value="">Select a dashboard</option>
							{#each dashboardOptions as dashboard}
								<option value={dashboard.value}>{dashboard.label}</option>
							{/each}
						</select>
					</div>

					<Sheet.Footer>
						<Sheet.Close class={buttonVariants({ variant: "outline" })}>Cancel</Sheet.Close>
						<button
							type="button"
							class={buttonVariants()}
							disabled={!selectedDashboard}
							onclick={saveToDashboard}
						>
							Save
						</button>
					</Sheet.Footer>
				</Sheet.Content>
			</Sheet.Root>
		</div>
	</div>
</article>
