<script lang="ts">
	import type { Profile, Role } from '@prisma/client';
	import CrosshairIcon from '~icons/game-icons/crosshair';
	import TagIcon from '~icons/ri/price-tag-3-line';

	import TopBlogerCard from './_TopBlogerCard/TopBlogerCard.svelte';
	import CarouselBottom from './_CarouselBottom/CarouselBottom.svelte';

	interface TopUser {
		id: number;
		role: Role;
		email: string;
		username: string;
		profile: Profile;
		_count: {
			followedBy: number;
			following: number;
			articles: number;
		};
		createdAt: Date;
	}

	export let topUsers: TopUser[];
	export let popularTags: string[];

	let carouselIndex: number = 0;
</script>

<div class="grid grid-cols-1 gap-8 items-center md:gap-10 lg:grid-cols-2">
	<div class="space-y-4 md:space-y-6 mx-auto lg:mx-0">
		<div class="flex justify-center items-center w-24 h-24 rounded-full bg-surface-500">
			<div class="badge-icon variant-filled-primary w-16 h-16">
				<CrosshairIcon class="w-8 h-8" />
			</div>
		</div>

		<div>
			<h2 class="!text-4xl min-[540px]:!text-6xl">당신의 개발 이야기</h2>
			<h3 class="!text-2xl min-[540px]:!text-4xl">기록하고 공유하세요</h3>
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
				class="transition-all ease-in-out duration-[800ms]
				{carouselIndex === index
					? 'visible opacity-100'
					: 'invisible opacity-0 absolute top-0 translate-y-6 translate-x-4 pointer-events-none'}"
			>
				<TopBlogerCard
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
		<CarouselBottom maxIndex={topUsers.length} bind:carouselIndex />
	</div>

	<div class="space-y-2">
		<div class="flex items-center gap-2">
			<TagIcon class="w-6 h-6" />
			<span class="text-xl">인기 태그</span>
		</div>

		<ul class="flex flex-wrap gap-2">
			{#each popularTags as tag (tag)}
				<li>
					<a href="/" class="btn variant-ringed-tertiary btn-sm">{tag}</a>
				</li>
			{/each}
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
