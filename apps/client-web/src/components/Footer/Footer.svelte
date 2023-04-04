<script lang="ts">
	import { defaultLinks, communities } from '$lib/constants/nav';
</script>

<footer class="px-[5vw]">
	<div class="grid grid-cols-8 border-t border-t-surface-500 py-12">
		<div class="col-span-3">
			<div class="">
				<h2 class="unstyled font-logo text-2xl md:text-4xl">Warmgun</h2>
			</div>
			<div class="flex flex-col text-primary-500 mt-2">
				<span class="text-xl font-bold">For those</span>
				<span class="text-xl font-bold">who are tired of their daily lives</span>
			</div>
			<div class="text-primary-500" />
		</div>

		<div class="col-span-2">
			<div class="text-lg font-bold mb-4">Site</div>
			<nav class="">
				<ul class="flex flex-col gap-4">
					{#each defaultLinks as defaultLink (defaultLink.name)}
						<li>
							<a class="unstyled flex items-center gap-2 text-surface-300" href={defaultLink.to}>
								<span>
									<svelte:component this={defaultLink.icon} class="w-[24px] h-[24px]" />
								</span>
								<span class="flex-auto">{defaultLink.name}</span>
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</div>

		<div class="col-span-2">
			<div class="text-lg font-bold mb-4">Community</div>
			<nav class="">
				<ul class="flex flex-col gap-4">
					{#each communities as community (community.name)}
						<li>
							<a class="unstyled flex items-center gap-2" href={community.to}>
								<span class="flex-auto text-surface-300">{community.name}</span>
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</div>
	</div>

	<div class="py-12">
		<span class="text-surface-300 font-thin">Created By Gongzone</span>
	</div>
</footer>
