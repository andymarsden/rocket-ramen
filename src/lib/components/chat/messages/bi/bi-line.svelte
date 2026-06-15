<script>
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

	let chartCanvas = $state();

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
	<p class="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Assistant</p>

	<div class="rounded-lg border border-border/60 bg-background/70 p-4">
		<p class="text-sm font-semibold text-foreground">{title}</p>
		{#if description}
			<p class="mt-1 text-xs text-muted-foreground">{description}</p>
		{/if}

		{#if chartData}
			<div class="mt-4 h-80">
				<canvas bind:this={chartCanvas}></canvas>
			</div>
		{:else}
			<p class="mt-4 text-sm text-muted-foreground">No chart data available.</p>
		{/if}
	</div>
</article>
