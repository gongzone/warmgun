<script lang="ts">
	import ArticleCard from '$components/Article/ArticleCard.svelte';

	const trendingArticles = [
		{
			id: 0,
			coverImage: 'https://source.unsplash.com/random/1280x540?skeleton',
			title: 'Good Article!',
			subTitle: '임시 테스트 아티클입니다',
			writerAvatar: 'https://i.pravatar.cc/160?img=48',
			writerName: 'Alex',
			date: new Date()
		},
		{
			id: 1,
			coverImage: 'https://source.unsplash.com/random/1280x540?skeleton',
			title: 'Good Article!',
			subTitle: '임시 테스트 아티클입니다',
			writerAvatar: 'https://i.pravatar.cc/160?img=48',
			writerName: 'Alex',
			date: new Date()
		},
		{
			id: 2,
			coverImage: 'https://source.unsplash.com/random/1280x540?skeleton',
			title: 'Good Article!',
			subTitle: '임시 테스트 아티클입니다',
			writerAvatar: 'https://i.pravatar.cc/160?img=48',
			writerName: 'Alex',
			date: new Date()
		},
		{
			id: 11,
			coverImage: 'https://source.unsplash.com/random/1280x540?skeleton',
			title: 'Good Article!',
			subTitle:
				'With micro-frontends each app needs to be as independent as possible. But sometimes a communication between the applications is mandatory (in our use case changing the language of all micro-frontends at the same time). In this article I will discuss more on how to implement the translation functionality using i18n in a micro-frontends environment and further explore how this can be achieved with hooks.',
			writerAvatar: 'https://i.pravatar.cc/160?img=48',
			writerName: 'Alex',
			date: new Date()
		},
		{
			id: 3,
			coverImage: 'https://source.unsplash.com/random/1280x540?skeleton',
			title: 'Good Article!',
			subTitle: '임시 테스트 아티클입니다',
			writerAvatar: 'https://i.pravatar.cc/160?img=48',
			writerName: 'Alex',
			date: new Date()
		},
		{
			id: 4,
			coverImage: 'https://source.unsplash.com/random/1280x540?skeleton',
			title: 'Good Article!',
			subTitle: '임시 테스트 아티클입니다',
			writerAvatar: 'https://i.pravatar.cc/160?img=48',
			writerName: 'Alex',
			date: new Date()
		},
		{
			id: 5,
			coverImage: 'https://source.unsplash.com/random/1280x540?skeleton',
			title: 'Good Article!',
			subTitle: '임시 테스트 아티클입니다',
			writerAvatar: 'https://i.pravatar.cc/160?img=48',
			writerName: 'Alex',
			date: new Date()
		},
		{
			id: 6,
			coverImage: 'https://source.unsplash.com/random/1280x540?skeleton',
			title: 'Good Article!',
			subTitle: '임시 테스트 아티클입니다',
			writerAvatar: 'https://i.pravatar.cc/160?img=48',
			writerName: 'Alex',
			date: new Date()
		},
		{
			id: 7,
			coverImage: 'https://source.unsplash.com/random/1280x540?skeleton',
			title: 'Good Article!',
			subTitle: '임시 테스트 아티클입니다',
			writerAvatar: 'https://i.pravatar.cc/160?img=48',
			writerName: 'Alex',
			date: new Date()
		},
		{
			id: 8,
			coverImage: 'https://source.unsplash.com/random/1280x540?skeleton',
			title: 'Good Article!',
			subTitle: '임시 테스트 아티클입니다',
			writerAvatar: 'https://i.pravatar.cc/160?img=48',
			writerName: 'Alex',
			date: new Date()
		},
		{
			id: 9,
			coverImage: 'https://source.unsplash.com/random/1280x540?skeleton',
			title: 'Good Article!',
			subTitle: '임시 테스트 아티클입니다',
			writerAvatar: 'https://i.pravatar.cc/160?img=48',
			writerName: 'Alex',
			date: new Date()
		},
		{
			id: 10,
			coverImage: 'https://source.unsplash.com/random/1280x540?skeleton',
			title: 'Good Article!',
			subTitle: '임시 테스트 아티클입니다',
			writerAvatar: 'https://i.pravatar.cc/160?img=48',
			writerName: 'Alex',
			date: new Date()
		}
	];
</script>

<div class="px-[5vw] py-10 md:py-14">
	<div class="flex flex-col items-center justify-center space-y-2 mb-8">
		<div class="relative">
			<span class="absolute w-[50px] top-[50%] border-b-2 -translate-x-[125%]" />
			<span class="text-4xl font-bold">Trending Articles</span>
			<span class="absolute w-[50px] top-[50%] border-b-2 right-0 translate-x-[125%]" />
		</div>
		<span class="text-sm text-surface-300">요새 뜨는 글들을 만나보세요</span>
	</div>

	<ul class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
		{#each trendingArticles as article (article.id)}
			<ArticleCard {article} />
		{/each}
	</ul>
</div>
