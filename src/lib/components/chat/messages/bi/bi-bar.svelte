<script>
	import {
		BarController,
		BarElement,
		CategoryScale,
		Chart as ChartJS,
		Legend,
		LinearScale,
		Title,
		Tooltip,
	} from "chart.js";
	import * as Select from "$lib/components/ui/select/index.js";

	ChartJS.register(
		BarController,
		CategoryScale,
		LinearScale,
		BarElement,
		Title,
		Tooltip,
		Legend,
	);

	let chartCanvas = $state();
	let sortMode = $state("value");

	let { message } = $props();

	const barOutput = $derived.by(() => {
		const data = message?.content?.data;
		const output = message?.content?.output;

		if (output?.type === "bar_chart") {
			return output;
		}

		if (data?.output?.type === "bar_chart") {
			return data.output;
		}

		if (Array.isArray(data) && data[0]?.output?.type === "bar_chart") {
			return data[0].output;
		}

		if (data?.type === "bar_chart") {
			return data;
		}

		return null;
	});

	const title = $derived(barOutput?.title ?? "Bar Chart");
	const description = $derived(barOutput?.description ?? "");

	const rows = $derived.by(() =>
		Array.isArray(barOutput?.data) ? barOutput.data : [],
	);
	const xAxis = $derived(barOutput?.x_axis ?? {});
	const yAxis = $derived(barOutput?.y_axis ?? {});

	const points = $derived.by(() => {
		const xField = xAxis.field || "category";
		const yField = yAxis.field || "value";

		return rows
			.map((row) => {
				const label = String(
					row?.[xField] ?? row?.category ?? "",
				).trim();
				const value = Number(row?.[yField] ?? row?.value ?? 0);

				return {
					label,
					value,
				};
			})
			.filter(
				(row) => row.label.length > 0 && Number.isFinite(row.value),
			);
	});

	const sortedPoints = $derived.by(() => {
		if (!points.length) {
			return [];
		}

		const nextPoints = [...points];

		if (sortMode === "alpha") {
			nextPoints.sort((a, b) => a.label.localeCompare(b.label));
			return nextPoints;
		}

		nextPoints.sort((a, b) => b.value - a.value);
		return nextPoints;
	});

	const chartData = $derived.by(() => {
		if (!sortedPoints.length) {
			return null;
		}

		return {
			labels: sortedPoints.map((point) => point.label),
			datasets: [
				{
					label: yAxis.label || "Total Visits",
					data: sortedPoints.map((point) => point.value),
					backgroundColor: "rgb(3, 88, 101)",
					hoverBackgroundColor: "#047687",
					//borderColor: "rgba(2, 132, 199, 1)",
					borderWidth: 1,
					borderRadius: 6,
					maxBarThickness: 36,
				},
			],
		};
	});

	const truncateAxisLabel = (label) => {
		const normalizedLabel = String(label ?? "");

		if (normalizedLabel.length <= 10) {
			return normalizedLabel;
		}

		return `${normalizedLabel.slice(0, 10)}...`;
	};

	const options = $derived.by(() => ({
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: false,
			},
		},

		scales: {
			x: {
				title: {
					display: Boolean(xAxis.label),
					text: xAxis.label || "Hub Attended",
				},
				ticks: {
					maxRotation: 90,
					minRotation: 90,
					callback: function (value) {
						return truncateAxisLabel(this.getLabelForValue(value));
					},
				},
				grid: {
					color: "#F1F3F7",
					display: false,
				},
				border: {
					display: false,
				},
			},
			y: {
				beginAtZero: true,
				title: {
					display: Boolean(yAxis.label),
					text: yAxis.label || "Total Visits",
				},
				grid: {
					color: "#F1F3F7",
					borderDash: [1, 4],
					//display: false
				},
				border: {
					display: false,
				},
			},
		},
	}));

	$effect(() => {
		const data = chartData;
		const chartOptions = options;

		if (!chartCanvas || !data) {
			return;
		}

		const chart = new ChartJS(chartCanvas, {
			type: "bar",
			data,
			options: chartOptions,
		});

		return () => {
			chart.destroy();
		};
	});
</script>

<article>
	<p
		class="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground"
	>
		Assistant
	</p>

	<div class="rounded-lg border border-border/60 bg-background/70 p-4">
		<div
			class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"
		>
			<div>
				<p class="text-sm font-semibold text-foreground">{title}</p>
				{#if description}
					<p class="mt-1 text-xs text-muted-foreground">
						{description}
					</p>
				{/if}
			</div>

			<div class="flex items-center gap-2 sm:justify-end">
				<Select.Root type="single" bind:value={sortMode}>
					<Select.Trigger
						id="sort-mode"
						class="h-8 w-20 text-xs font-medium"
					>
						{sortMode === "alpha" ? "A-Z" : "Value"}
						<!-- Sort -->
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.Label>Sort by</Select.Label>

							<Select.Item value="value" label="Value"
								>Value</Select.Item
							>
							<Select.Item value="alpha" label="A-Z"
								>A-Z</Select.Item
							>
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
		</div>

		{#if chartData}
			<div class="mt-4 h-80">
				<canvas bind:this={chartCanvas}></canvas>
			</div>
		{:else}
			<p class="mt-4 text-sm text-muted-foreground">
				No chart data available.
			</p>
		{/if}
		<hr />
		<p class="text-sm font-semibold text-foreground pt-2">Insights</p>
	</div>
</article>
