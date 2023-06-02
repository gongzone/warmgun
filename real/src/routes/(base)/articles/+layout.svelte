<script lang="ts">
	import { page } from '$app/stores';
	import ArticlesTab from './_ArticlesTab/ArticlesTab.svelte';

	$: classesActive = (href: string) => (href === $page.url.pathname ? 'variant-filled' : '');
</script>

<main class="container py-12 md:py-20">
	<div class="flex flex-col gap-1 items-center justify-center mb-12">
		<span class="font-bold font-heading-token text-4xl">Bring, Discover, Share</span>
		<span class="font-bold text-xl">Ideas & Stories</span>
	</div>

	<div class="grid grid-cols-3 gap-7 max-w-[1024px] mx-auto">
		<a href="/articles" class="card card-hover p-5 space-y-2 {classesActive('/articles')}">
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
			href="/articles/recent"
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
			href="/articles/best"
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

	<div class="my-12">
		<ArticlesTab />
		<slot />
	</div>
</main>
