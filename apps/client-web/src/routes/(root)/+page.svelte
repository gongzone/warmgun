<script lang="ts">
	import MedalIcon from '~icons/ri/medal-2-line';
	import FireIcon from '~icons/ri/fire-fill';

	import HomeHero from '$components/Hero/HomeHero/HomeHero.svelte';
	import MainTitle from '$components/@ui/Block/MainTitle.svelte';
	import ThickDivider from '$components/@ui/Block/ThickDivider.svelte';
	import BestArtcles from '$components/Article/BestArtcles.svelte';
	import HotArticles from '$components/Article/HotArticles.svelte';
	import TopBlogersBox from '$components/Display/TopBlogersDisplay/TopBlogersDisplay.svelte';
</script>

<HomeHero />

<main class="px-[5vw] py-10 md:py-20">
	<MainTitle title="Trending Articles" subTitle="요새 뜨는 글들을 만나보세요" />

	<ThickDivider text="Best of Best" icon={MedalIcon} />
	<section>
		<BestArtcles />
	</section>

	<ThickDivider text="Hot Articles" icon={FireIcon} />
	<div class="lg:grid lg:grid-cols-[repeat(8,1fr)_repeat(4,_minmax(48px,_1fr))]">
		<section class="col-[1_/_span_7]">
			<HotArticles />
		</section>

		<aside class="col-[9_/_span_4] hidden lg:block pb-6">
			<div class="">
				<TopBlogersBox />
			</div>
		</aside>
	</div>
</main>
