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

	<div class="relative lg:grid lg:grid-cols-12 lg:gap-12">
		<div class="lg:col-span-8">
			<section>
				<HomeSectionTitle
					title="커뮤니티"
					subTitle="여러 사람들과 소통해보세요"
					link="/community"
				/>

				<div class="flex flex-col gap-10 min-[580px]:grid min-[580px]:grid-cols-2">
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

		<aside class="col-span-4 flex-col gap-8 pl-8 border-l border-l-surface-600 hidden lg:flex">
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
</div>
