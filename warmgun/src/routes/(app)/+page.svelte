<script lang="ts">
	import type { PageServerData } from './$types';
	import { goto } from '$app/navigation';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import HotIcon from '~icons/ri/fire-fill';
	import TimerIcon from '~icons/ri/timer-flash-line';

	import HomeHero from '$components/Hero/HomeHero/HomeHero.svelte';
	import ArticleCard from '$components/@ui-items/ArticleCard/ArticleCard.svelte';

	export let data: PageServerData;
	let filter: 'trending' | 'recent' = 'trending';

	$: ({ topUsers, popularTags } = data);
</script>

<div class="space-y-16 md:space-y-28">
	<section class="">
		<HomeHero {topUsers} {popularTags} />
		<!-- <div class="flex items-center justify-between mb-12 rounded-xl bg-surface-800 p-8 shadow-lg">
			<div class="flex items-center gap-2">
				<HotIcon class="w-7 h-7" />

				<span class="text-2xl font-thin">Trending Articles</span>
			</div>
		</div> -->
	</section>

	<section>
		<h2 class="!text-5xl">Trending Article</h2>
		<div class="flex items-center gap-2">
			<HotIcon class="w-5 h-5 opacity-75" />
			<p class="!text-lg opacity-75 font-thin">요즘 뜨는 아티클들을 만나보세요.</p>
		</div>
	</section>

	<!-- <section>
		<div class="flex items-center justify-between mb-12 rounded-xl bg-surface-800 p-8 shadow-lg">
			<div class="flex items-center gap-2">
				{#if filter === 'trending'}
					<HotIcon class="w-7 h-7" />
				{:else}
					<TimerIcon class="w-7 h-7" />
				{/if}

				<span class="text-2xl font-thin">{filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
			</div>

			<div>
				<RadioGroup>
					<RadioItem
						bind:group={filter}
						name="justify"
						value="trending"
						on:click={() => goto(`/`, { noScroll: true })}>트렌딩</RadioItem
					>
					<RadioItem
						bind:group={filter}
						name="justify"
						value="recent"
						on:click={(e) => goto(`?filter=${e.target.value}`, { noScroll: true })}>최신</RadioItem
					>
				</RadioGroup>
			</div>
		</div>

		<ul class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
			{#each articles.data as article (article.id)}
				<li><ArticleCard {article} /></li>
			{/each}
			<InfiniteScroll
				fetchFn={() =>
					goto(`?filter=${filter}&cursor=${articles.nextCursor}`, {
						noScroll: true
					})}
				hasNextPage={!!articles.nextCursor}
			/>
		</ul>
	</section> -->

	<div class="h-40" />
</div>
