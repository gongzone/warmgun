<script lang="ts">
	import type { PageServerData } from './$types';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import CrosshairIcon from '~icons/game-icons/crosshair';
	import TagIcon from '~icons/ri/price-tag-3-line';
	import ArrowRight from '~icons/ri/arrow-right-s-fill';
	import ArrowLeft from '~icons/ri/arrow-left-s-fill';

	import BlogerCard from '$components/@ui-items/BlogerCard.svelte';
	import { onDestroy, onMount } from 'svelte';

	export let topUsers: PageServerData['topUsers'];

	let carouselIndex: number = 0;
	let interval: NodeJS.Timer;

	function onClickNext() {
		clearInterval(interval);
		if (carouselIndex === topUsers.length - 1) {
			carouselIndex = 0;

			return;
		}

		carouselIndex++;
		interval = setInterval(() => {
			if (carouselIndex === topUsers.length - 1) {
				carouselIndex = 0;
				return;
			}

			carouselIndex++;
		}, 3000);
	}

	function onClickPrev() {
		clearInterval(interval);
		if (carouselIndex === 0) {
			carouselIndex = topUsers.length - 1;
			return;
		}

		carouselIndex--;
		interval = setInterval(() => {
			if (carouselIndex === topUsers.length - 1) {
				carouselIndex = 0;
				return;
			}

			carouselIndex++;
		}, 3000);
	}

	onMount(() => {
		interval = setInterval(() => {
			if (carouselIndex === topUsers.length - 1) {
				carouselIndex = 0;
				return;
			}

			carouselIndex++;
		}, 3000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div class="grid grid-cols-1 gap-8 items-center md:gap-10 lg:grid-cols-2">
	<div class="space-y-6 mx-auto lg:mx-0">
		<div class="flex justify-center items-center w-24 h-24 rounded-full bg-surface-500">
			<div class="badge-icon variant-filled-primary w-16 h-16">
				<CrosshairIcon class="w-8 h-8" />
			</div>
		</div>

		<div>
			<h2 class="!text-5xl md:!text-6xl">당신의 개발 이야기</h2>
			<h3 class="!text-3xl md:!text-4xl">기록하고 공유하세요</h3>
		</div>

		<div>
			<p class="font-thin !text-lg">Bring, Discover, Share</p>
			<p class="font-thin !text-lg">Ideas & Stories</p>
		</div>
	</div>

	<div class="relative max-w-[640px] mx-auto">
		<div class="bloger-card-gradient" />
		<span
			class="badge variant-filled-primary absolute -top-4 -right-12 z-10 text-lg px-6 py-6 rotate-[30deg] font-extralight"
			>Top Bloger
		</span>

		{#each topUsers as { id, username, profile: { avatar, bio, field }, _count }, index (id)}
			<div
				class="{carouselIndex === index
					? 'visible opacity-100'
					: 'invisible opacity-0 absolute top-0 translate-y-6 translate-x-4'} transition-all ease-in-out duration-[800ms]"
			>
				<BlogerCard
					{username}
					{avatar}
					{bio}
					{field}
					followedByCount={_count.followedBy}
					followingCount={_count.following}
					articleCount={_count.articles}
				/>
			</div>
		{/each}

		<div class="absolute w-full grid grid-cols-[15%_70%_15%] items-center py-4 px-0 sm:px-4">
			<button
				class="btn-icon bg-surface-50 border border-surface-300 shadow-lg text-surface-900
				hover:bg-surface-500 hover:text-surface-50 place-self-center"
				on:click={onClickPrev}
			>
				<ArrowLeft />
			</button>
			<div class="mx-4 md:mx-8">
				<TabGroup
					regionList="justify-between items-center"
					padding="px-0 py-0"
					border="border-0"
					active="border-0"
				>
					{#each Array.from({ length: topUsers.length }) as _, index (index)}
						<Tab bind:group={carouselIndex} name="tab{index}" value={index}>
							<div
								class="w-2 h-2 rounded-full transition-colors ease-in duration-200 hover:bg-primary-500 {carouselIndex ===
								index
									? 'bg-primary-500'
									: 'bg-surface-50'}"
							/>
						</Tab>
					{/each}
				</TabGroup>
			</div>
			<button
				class="btn-icon bg-surface-50 border border-surface-300 shadow-lg text-surface-900
				hover:bg-surface-500 hover:text-surface-50 place-self-center"
				on:click={onClickNext}
			>
				<ArrowRight />
			</button>
		</div>
	</div>

	<div class="space-y-2 max-w-[640px] mx-auto">
		<div class="flex items-center gap-2">
			<TagIcon class="w-6 h-6" />
			<span class="text-xl">인기 태그</span>
		</div>

		<ul class="flex flex-wrap gap-2">
			<li>
				<a href="/" class="btn variant-ringed-tertiary btn-sm">React</a>
			</li>
			<li>
				<a href="/" class="btn variant-ringed-tertiary btn-sm">Svelte</a>
			</li>
			<li>
				<a href="/" class="btn variant-ringed-tertiary btn-sm">SvelteKit</a>
			</li>
			<li>
				<a href="/" class="btn variant-ringed-tertiary btn-sm">TypeScript</a>
			</li>
			<li>
				<a href="/" class="btn variant-ringed-tertiary btn-sm">TypeScript</a>
			</li>
			<li>
				<a href="/" class="btn variant-ringed-tertiary btn-sm">TypeScript</a>
			</li>
			<li>
				<a href="/" class="btn variant-ringed-tertiary btn-sm">TypeScript</a>
			</li>
			<li>
				<a href="/" class="btn variant-ringed-tertiary btn-sm">TypeScript</a>
			</li>
		</ul>
	</div>
</div>

<style lang="postcss">
	.bloger-card-gradient {
		width: 360px;
		height: 400px;
		z-index: -1;
		top: -43px;
		left: 0;
		position: absolute;
		filter: blur(45px);
		transform: translateZ(0);
		transform: translateY(0%);
		background: conic-gradient(
			from 180deg at 67% 67%,
			rgb(var(--color-primary-400) / 0.16) 0deg,
			rgb(var(--color-primary-700) / 0.25) 55deg,
			rgb(var(--color-tertiary-600) / 0.35) 120deg,
			rgb(var(--color-error-700) / 0.26) 160deg,
			transparent 360deg
		);
	}
</style>
