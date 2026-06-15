<script>
	import { Pie } from "svelte-chartjs";
	import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";

	ChartJS.register(ArcElement, Tooltip, Legend);

	let { message } = $props();

	const pieOutput = $derived.by(() => {
		const data = message?.content?.data;
		const output = message?.content?.output;

		if (output?.type === "pie_chart") {
			return output;
		}

		if (data?.output?.type === "pie_chart") {
			return data.output;
		}

		if (Array.isArray(data) && data[0]?.output?.type === "pie_chart") {
			return data[0].output;
		}

		if (data?.type === "pie_chart") {
			return data;
		}

		return null;
	});

	const title = $derived(pieOutput?.title ?? "Pie Chart");
	const description = $derived(pieOutput?.description ?? "");

	const points = $derived.by(() => {
		const rows = Array.isArray(pieOutput?.data) ? pieOutput.data : [];
		const labelKey = pieOutput?.label_field || "label";
		const valueKey = pieOutput?.value_field || "value";

		return rows
			.map((row) => {
				const label = String(row?.[labelKey] ?? row?.label ?? "").trim();
				const value = Number(row?.[valueKey] ?? row?.value ?? 0);
				return {
					label,
					value
				};
			})
			.filter((row) => row.label.length > 0 && Number.isFinite(row.value));
	});

	const totalValue = $derived(points.reduce((sum, point) => sum + point.value, 0));

	const pointsWithPercentage = $derived.by(() => {
		if (totalValue === 0) {
			return points;
		}
		return points.map((point) => ({
			...point,
			percentage: ((point.value / totalValue) * 100).toFixed(1)
		}));
	});

	const chartData = $derived.by(() => {
		if (!pointsWithPercentage.length) {
			return null;
		}

		return {
			labels: pointsWithPercentage.map((point) => `${point.label} (${point.percentage}%)`),
			datasets: [
				{
					data: pointsWithPercentage.map((point) => point.value),
					backgroundColor: ["#14532d", "#0ea5e9", "#f59e0b", "#ef4444", "#8b5cf6", "#14b8a6"],
					borderColor: "rgba(255, 255, 255, 0.9)",
					borderWidth: 2
				}
			]
		};
	});


	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: "bottom"
			}
		}
	};
</script>

<article>
	<p class="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Assistant</p>

	<div class="rounded-lg border border-border/60 bg-background/70 p-4">
		<p class="text-sm font-semibold text-foreground">{title}</p>
		{#if description}
			<p class="mt-1 text-xs text-muted-foreground">{description}</p>
		{/if}

		{#if chartData}
			<div class="mt-4 h-72">
				<Pie data={chartData} {options} />
			</div>
		{:else}
			<p class="mt-4 text-sm text-muted-foreground">No chart data available.</p>
		{/if}
	</div>
</article>
