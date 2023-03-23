<script lang="ts">
	import ArticleCard from '$components/Article/ArticleCard/ArticleCard.svelte';

	const a = [
		{ id: 1 },
		{ id: 2 },
		{ id: 3 },
		{ id: 4 },
		{ id: 5 },
		{ id: 6 },
		{ id: 7 },
		{ id: 8 },
		{ id: 9 },
		{ id: 10 },
		{ id: 11 },
		{ id: 12 }
	];
</script>

<div class="px-[5vw] py-10 md:py-20">
	<div class="flex flex-col items-center justify-center gap-3">
		<div class="relative">
			<span class="absolute w-[50px] top-[50%] border-b-2 -translate-x-[125%]" />
			<span class="text-4xl font-bold">Trending Articles</span>
			<span class="absolute w-[50px] top-[50%] border-b-2 right-0 translate-x-[125%]" />
		</div>
		<span class="text-sm text-surface-300">요새 뜨는 글들을 만나보세요</span>
	</div>

	<div class="bg-surface-800 p-8 my-12 rounded-xl shadow-lg">
		<i class="ri-medal-2-line ri-lg" />
		<span class="text-2xl font-thin">Best of Best</span>
	</div>

	<ul class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
		{#each a as article (article.id)}
			<ArticleCard />
		{/each}
	</ul>
</div>
