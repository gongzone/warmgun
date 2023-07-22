<script lang="ts">
	import MainWords from './_MainWords.svelte';
	import SubWords from './_SubWords.svelte';
	import HeroGradient from './_HeroGradient.svelte';
	import ArticleShowcase from './_ArticleShowcase.svelte';

	const articles = Array.from({ length: 10 }, (v, i) => ({
		id: i + 1,
		title: `스벨트킷은 훌륭합니다! ${i + 1}`,
		coverImage: `https://picsum.photos/id/${(i + 1) * 7}/270/405`,
		author: {
			nickname: 'Shadcn',
			avatar: 'https://github.com/shadcn.png'
		},
		tags: ['JavaScript', 'TypeScript', '개발 이야기'],
		category: 'FRONTEND'
	}));
</script>

<div class="grid grid-cols-1 gap-8 items-center md:gap-10 lg:grid-cols-2">
	<div class="relative z-20 space-y-4 mx-auto md:space-y-6 lg:mx-0">
		<MainWords />
		<SubWords />
	</div>

	<div class="relative w-full h-full max-w-[640px] mx-auto">
		<HeroGradient />
		<ArticleShowcase {articles} />
	</div>
</div>
