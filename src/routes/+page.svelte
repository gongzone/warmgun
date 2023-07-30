<script lang="ts">
	import type { PageData } from './$types';

	import HomeHero from '$components/Home/HomeHero/HomeHero.svelte';
	import Separator from '$components/@ui/Separator.svelte';
	import HomeSectionTitle from '$components/Home/HomeSectionTitle.svelte';
	import HomePosts from '$components/Home/HomePosts.svelte';
	import { CommunityIcons } from '$components/@icons/community';
	import HomeArticles from '$components/Home/HomeArticles.svelte';
	import HomeAsideTitle from '$components/Home/HomeAsideTitle.svelte';
	import HomePopularTags from '$components/Home/HomePopularTags.svelte';
	import HomeCategories from '$components/Home/HomeCategories.svelte';
	import HomeTopUsers from '$components/Home/HomeTopUsers.svelte';

	export let data: PageData;

	$: ({
		bestArticles,
		trendingArticles,
		recentArticles,
		freePosts,
		questionPosts,
		discussionPosts,
		temaPosts,
		popularTags,
		topUsers
	} = data);
</script>

<!-- <Seo /> -->

<div class="container py-16">
	<section>
		<HomeHero articles={bestArticles} />
	</section>

	<Separator class="my-16" />

	<div class="relative grid grid-cols-12 gap-12">
		<div class="col-span-8">
			<section>
				<HomeSectionTitle
					title="커뮤니티"
					subTitle="여러 사람들과 소통해보세요"
					link="/community"
				/>

				<div class="grid grid-cols-2 gap-10">
					<HomePosts
						title="자유"
						icon={CommunityIcons.free}
						link="/community/free"
						posts={freePosts}
					/>
					<HomePosts
						title="질문"
						icon={CommunityIcons.question}
						link="/community/question"
						posts={questionPosts}
					/>
					<HomePosts
						title="토론"
						icon={CommunityIcons.discussion}
						link="/community/discussion"
						posts={discussionPosts}
					/>
					<HomePosts
						title="팀원"
						icon={CommunityIcons.team}
						link="/community/team"
						posts={temaPosts}
					/>
				</div>
			</section>

			<Separator class="my-16" />

			<section>
				<HomeSectionTitle
					title="트렌딩 아티클"
					subTitle="요즘 뜨는 아티클들을 확인해보세요"
					link="/articles"
				/>

				<HomeArticles articles={trendingArticles} />
			</section>

			<div class="my-16" />

			<section>
				<HomeSectionTitle
					title="최신 아티클"
					subTitle="최근 사람들의 생각을 탐색해보세요"
					link="/articles"
				/>

				<HomeArticles articles={recentArticles} />
			</section>
		</div>
		<aside class="col-span-4 flex flex-col gap-8 pl-8 border-l border-l-surface-600">
			<div>
				<HomeAsideTitle title="인기태그" />
				<HomePopularTags tags={popularTags} />
			</div>

			<div>
				<HomeAsideTitle title="카테고리" />
				<HomeCategories />
			</div>

			<div>
				<HomeAsideTitle title="우수 블로거" />
				<HomeTopUsers users={topUsers} />
			</div>
		</aside>
	</div>

	<!-- Todo: Refactoring -->
	<!-- <div class="grid grid-cols-12 gap-12 relative">
		<div class="col-span-9 flex flex-col gap-16">
			<section class="">
				<div class="space-y-8">
					<div>
						<h3 class="text-4xl font-heading font-bold">커뮤니티</h3>
						<p>요즘 뜨는 아티클들을 만나보세요</p>
					</div>
					<div class="col-span-9 grid grid-cols-2 gap-8">
						<div>
							<span class="font-semibold block text-lg">질문</span>
							<ul>
								{#each Array.from({ length: 5 }) as question, index (index)}
									<li class="py-4 space-y-2">
										<div class="flex items-center gap-2">
											<Avatar src="https://github.com/shadcn.png" width="w-6" />
											<span class="text-sm">shadcn</span>
										</div>

										<div>
											<h1 class="font-bold line-clamp-1">
												개발자가 사랑하는 프론트엔드 프레임워크1 스벨트[Svelte]의 특징
											</h1>
										</div>
									</li>
									<hr />
								{/each}
							</ul>
						</div>

						<div>
							<span class="font-semibold block text-lg">자유게시판</span>
							<ul>
								{#each Array.from({ length: 5 }) as question, index (index)}
									<li class="py-4 space-y-2">
										<div class="flex items-center gap-2">
											<Avatar
												src="https://images.unsplash.com/photo-1502768040783-423da5fd5fa0?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzY4ODd8&ixlib=rb-4.0.3&w=200&h=200&auto=format&fit=crop"
												width="w-6"
											/>
											<span class="text-sm">라일라</span>
										</div>

										<div>
											<h1 class="font-bold line-clamp-1">
												OP.GG, 서비스 내 '인디게임 실시간 체험판 플레이' 선보였다
											</h1>
										</div>
									</li>
									<hr />
								{/each}
							</ul>
						</div>
					</div>
				</div>
			</section>

			<section>
				<div class="space-y-8">
					<div>
						<h3 class="text-4xl font-heading font-bold">트렌딩 아티클</h3>
						<p>요즘 뜨는 아티클들을 만나보세요</p>
					</div>
					<ul class="grid grid-cols-3 gap-7">
						{#each trendingArticles as article, index (article.id)}
							{#if index <= 8}
								<li class="pb-4">
									<Article {article} />
								</li>
							{/if}
						{/each}
					</ul>
				</div>
			</section>

			<section>
				<div class="space-y-8">
					<div>
						<h3 class="text-4xl font-heading font-bold">최신 아티클</h3>
						<p>요즘 뜨는 아티클들을 만나보세요</p>
					</div>
					<ul class="grid grid-cols-3 gap-7">
						{#each trendingArticles as article, index (article.id)}
							{#if index <= 8}
								<li class="pb-4">
									<Article {article} />
								</li>
							{/if}
						{/each}
					</ul>
				</div>
			</section>

			<section>
				<div class="space-y-8">
					<div>
						<h3 class="text-4xl font-heading font-bold">베스트 아티클</h3>
						<p>요즘 뜨는 아티클들을 만나보세요</p>
					</div>
					<ul class="grid grid-cols-3 gap-7">
						{#each trendingArticles as article, index (article.id)}
							{#if index <= 8}
								<li class="pb-4">
									<Article {article} />
								</li>
							{/if}
						{/each}
					</ul>
				</div>
			</section>
		</div>

		<aside class="space-y-6 col-span-3 h-full">
			<div class="border rounded-lg p-4 space-y-2 shadow-2xl bg-[#151515]">
				<span class="font-semibold block">인기 태그</span>
				<div class="flex flex-wrap gap-2">
					{#each popularTags as tag (tag.id)}
						<Button variant="outline" size="sm">{tag.name}</Button>
					{/each}
				</div>
			</div>

			<div class="border rounded-lg p-4 space-y-2 shadow-2xl bg-[#151515]">
				<span class="font-semibold block">카테고리</span>
				<div class="flex flex-wrap gap-2">
					{#each categories as category (category.title)}
						<Button variant="outline" size="sm" class="rounded-md">{category.title}</Button>
					{/each}
				</div>
			</div>

			<div class="border rounded-lg p-4 space-y-2 shadow-2xl bg-[#151515]">
				<span class="font-semibold block">See More</span>
				<ul class="">
					<li
						class="flex flex-nowrap items-center px-3 py-2 gap-3 rounded-full hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors duration-200 ease-in-out"
					>
						<span><ArticleIcon /></span>
						<span>아티클 페이지</span>
						<span><ArrowRightSmall /></span>
					</li>
					<li
						class="flex flex-nowrap items-center px-3 py-2 gap-3 rounded-full hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors duration-200 ease-in-out"
					>
						<span><GenreIcon /></span>
						<span>커뮤니티</span>
						<span><ArrowRightSmall /></span>
					</li>
					<li
						class="flex flex-nowrap items-center px-3 py-2 gap-3 rounded-full hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors duration-200 ease-in-out"
					>
						<span><SearchIcon /></span>
						<span>검색</span>
						<span><ArrowRightSmall /></span>
					</li>
					<li
						class="flex flex-nowrap items-center px-3 py-2 gap-3 rounded-full hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors duration-200 ease-in-out"
					>
						<span><FeedIcon /></span>
						<span>나의 피드</span>
						<span><ArrowRightSmall /></span>
					</li>
				</ul>
			</div>
		</aside>
	</div> -->
</div>
