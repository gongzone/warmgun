<script lang="ts">
	import { page } from '$app/stores';
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import { api } from '$lib/api/api';

	import ArticleItem from '$components/Article/ArticleItem/ArticleItem.svelte';
	import ArticleFilterPopup from '$components/@ui/Popup/ArticleFilterPopup.svelte';
	import InfiniteScroll from '$components/@utils/InfiniteScroll.svelte';
	import ArticlesTab from './_ArticlesTab/ArticlesTab.svelte';
	import Seo from '$components/@utils/Seo.svelte';

	$: articlesQuery = createInfiniteQuery({
		queryKey: [
			'articles',
			'genre',
			$page.params.genre?.toUpperCase() ?? 'ALL',
			$page.params.filter,
			12
		],
		queryFn: api().findArticles,
		getNextPageParam: (lastPage) => lastPage.nextCursor
	});

	$: classesActive = (href: string) =>
		$page.url.pathname.startsWith(href) ? 'variant-filled' : '';
</script>

<Seo title="아티클" />

<main class="container py-12 md:py-20">
	<div class="flex flex-col gap-1 items-center justify-center mb-12">
		<span class="font-bold font-heading-token text-2xl md:text-4xl">Bring, Discover, Share</span>
		<span class="font-bold text-lg md:text-xl">Ideas & Stories</span>
	</div>

	<div class="grid-cols-3 gap-7 max-w-[1024px] mx-auto hidden md:grid">
		<a
			href="/articles/trending{$page.params.genre ? `/${$page.params.genre}` : ''}"
			class="card card-hover p-5 space-y-2 {classesActive('/articles/trending')}"
		>
			<div class="flex items-center gap-2">
				<div class="rounded-full bg-primary-500 w-5 h-5" />
				<div class="space-y-3">
					<span class="block font-light">트렌딩 아티클</span>
				</div>
			</div>
			<p class="text-sm ml-7 font-light">요즘 뜨는 글들을 만나보세요.</p>
			<div />
		</a>

		<a
			href="/articles/recent{$page.params.genre ? `/${$page.params.genre}` : ''}"
			class="card card-hover p-5 space-y-2 {classesActive('/articles/recent')}"
		>
			<div class="flex items-center gap-2">
				<div class="rounded-full bg-secondary-500 w-5 h-5" />
				<div class="space-y-3">
					<span class="block font-light">최신 아티클</span>
				</div>
			</div>
			<p class="text-sm ml-7 font-light">최신순으로 글들을 확인해보세요.</p>
			<div />
		</a>

		<a
			href="/articles/best{$page.params.genre ? `/${$page.params.genre}` : ''}"
			class="card card-hover p-5 space-y-2 {classesActive('/articles/best')}"
		>
			<div class="flex items-center gap-2">
				<div class="rounded-full bg-tertiary-500 w-5 h-5" />
				<div class="space-y-3">
					<span class="block font-light">베스트 아티클</span>
				</div>
			</div>
			<p class="text-sm ml-7 font-light">최고의 글들을 엄선하였습니다.</p>
			<div />
		</a>
	</div>

	<div class="md:hidden">
		<ArticleFilterPopup />
	</div>

	<div class="my-6 md:my-12">
		<ArticlesTab />

		{#if $articlesQuery.isSuccess}
			<ul class="grid list-none grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-3">
				{#each $articlesQuery.data.pages as { data }}
					{#each data as article (article.id)}
						<li>
							<ArticleItem {article} />
						</li>
					{/each}
				{/each}
			</ul>

			<InfiniteScroll
				fetchFn={$articlesQuery.fetchNextPage}
				hasNextPage={$articlesQuery.hasNextPage}
			/>
		{:else}
			<div>
				<span>작성된 글이 없습니다.</span>
			</div>
		{/if}
	</div>
</main>
