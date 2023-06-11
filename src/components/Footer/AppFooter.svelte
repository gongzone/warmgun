<script lang="ts">
	import { siteConfig } from '$lib/configs/site';
</script>

<footer class="container mt-32 border-t border-t-surface-500 py-12">
	<div class="grid grid-cols-4 gap-2 sm:grid-cols-7 lg:grid-cols-8">
		<div class="col-span-3 hidden space-y-2 sm:block">
			<span class="font-bold text-2xl">Warmgun</span>
			<div class="text-primary-500 flex flex-col">
				<span class="text-lg font-bold">For those</span>
				<span class="text-lg font-bold">who are tired of their daily lives</span>
			</div>
		</div>

		<div class="col-span-2 space-y-6">
			<span class="text-lg font-bold">Site</span>
			<nav class="">
				<ul class="inline-flex flex-col gap-3">
					{#each siteConfig.mainNav as link (link.title)}
						<a class="text-surface-300 font-extralight hover:text-token" href={link.href}>
							<span class="mr-1">᛫</span>
							<span>{link.title}</span>
						</a>
					{/each}
				</ul>
			</nav>
		</div>

		<div class="col-span-2 space-y-6">
			<span class="text-lg font-bold">Genre</span>
			<nav class="">
				<ul class="inline-flex flex-col gap-3">
					{#each siteConfig.genre as link (link.title)}
						<a class="text-surface-300 font-extralight hover:text-token" href={link.href}>
							<span class="mr-1">᛫</span>
							<span>{link.title}</span>
						</a>
					{/each}
				</ul>
			</nav>
		</div>
	</div>

	<div class="py-12">
		<span class="text-muted-foreground font-thin">Created By Gongzone</span>
	</div>
</footer>
