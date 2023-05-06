<script lang="ts">
	import type { PageServerData } from './$types';
	import HotIcon from '~icons/ri/fire-fill';
	import TimerIcon from '~icons/ri/timer-flash-line';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

	import HomeHero from './HomeHero.svelte';
	import ArticleCard from '$components/@ui-items/ArticleCard/ArticleCard.svelte';
	import { goto } from '$app/navigation';

	export let data: PageServerData;
	let value: 'trending' | 'recent' = 'trending';

	$: ({ topUsers, articles, nextCursor } = data);
</script>

<div>
	<section>
		<div class="section-container">
			<HomeHero {topUsers} />
		</div>
	</section>

	<section>
		<div class="px-[5vw]">
			<div class="flex items-center justify-between mb-12 rounded-xl bg-surface-800 p-8 shadow-lg">
				<div class="flex items-center gap-2">
					{#if value === 'trending'}
						<HotIcon class="w-7 h-7" />
					{:else}
						<TimerIcon class="w-7 h-7" />
					{/if}

					<span class="text-2xl font-thin">{value.charAt(0).toUpperCase() + value.slice(1)}</span>
				</div>

				<div>
					<RadioGroup>
						<RadioItem
							bind:group={value}
							name="justify"
							value="trending"
							on:click={() => goto(`/`, { noScroll: true, invalidateAll: true })}>트렌딩</RadioItem
						>
						<RadioItem
							bind:group={value}
							name="justify"
							value="recent"
							on:click={() => goto(`/?filter=${value}`, { noScroll: true, invalidateAll: true })}
							>최신</RadioItem
						>
					</RadioGroup>
				</div>
			</div>

			<ul class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
				{#each articles as article (article.id)}
					<li><ArticleCard {article} /></li>
				{/each}
			</ul>
		</div>
	</section>

	<div class="h-40" />
</div>

<style lang="postcss">
	.section-container {
		@apply w-full max-w-7xl mx-auto px-[5vw] py-16 md:py-24;
	}

	.hero-gradient {
		background-image: radial-gradient(
				at 0% 0%,
				rgba(var(--color-secondary-500) / 0.11) 0px,
				transparent 50%
			),
			radial-gradient(at 98% 1%, rgba(var(--color-error-500) / 0.11) 0px, transparent 50%);
	}
</style>
