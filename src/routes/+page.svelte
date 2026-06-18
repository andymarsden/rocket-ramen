<script>
	import { Button } from "$lib/components/ui/button/index.js";
</script>

<main class="flex min-h-screen items-center justify-center p-6">
	<section class="bg-card text-card-foreground w-full max-w-md rounded-xl border p-6 shadow-sm">
		<p class="text-2xl font-semibold tracking-tight">STAT</p>
		<p class="text-muted-foreground mt-1">Converstaional platform</p>

		<div class="mt-6 flex flex-col gap-3 sm:flex-row">
			<Button class="w-full sm:flex-1">Request Invite</Button>
			<Button variant="outline" class="w-full sm:flex-1">Sign In</Button>
		</div>
	</section>
</main>