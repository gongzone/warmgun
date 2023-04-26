<script lang="ts">
	import CrosshairIcon from '~icons/game-icons/crosshair';
	import TagIcon from '~icons/ri/price-tag-3-line';

	import BlogerCard from '$components/@ui-items/BlogerCard/BlogerCard.svelte';
</script>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center">
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

	<div class="relative">
		<div class="bloger-card-gradient" />
		<BlogerCard />
	</div>

	<div class="space-y-2">
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
