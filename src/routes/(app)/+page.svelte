<script lang="ts">
	import ArticleCard from '$components/Article/ArticleCard/ArticleCard.svelte';

	const trendingArticles = [
		{
			id: 0,
			coverImage: 'https://source.unsplash.com/random/1280x540?skeleton',
			title: '리액트의 기초를 잡고싶다면 보라! 리액트 훅, 리액트 컨텍스트, 전역상태 관리 및 모든것',
			subTitle:
				'임시 테스트 아티클입니다. Under certain circumstances overflow needs a little extra love. It turns out that there was a feature in the flexbox specification that added an ...',
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
		{#each trendingArticles as article, index (article.id)}
			<ArticleCard {article} />
		{/each}
	</ul>
</div>
