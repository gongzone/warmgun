<script lang="ts">
	import type { Article } from '$lib/types/article';

	import UserAvatar from '$components/@ui/UserAvatar.svelte';
	import ArrowRightIcon from '$components/@icons/ArrowRightIcon.svelte';
	import ArrowLeftSmall from '$components/@icons/ArrowLeftSmall.svelte';
	import ArrowRightSmall from '$components/@icons/ArrowRightSmall.svelte';
	import { categories } from '$lib/constants/categories';
	import Image from '$components/@ui/Image.svelte';
	import ImageIcon from '$components/@icons/editor/ImageIcon.svelte';

	export let articles: Article[];

	const perspective = 1200;
	const duration = 1000;
	const currentSize = { w: 270, h: 405 };
	const otherSize = { w: 200, h: 300 };

	let currentPage = 0;
	let angle = 0;
	let isTranslateXEnd = true;
	let isLoadFinished: boolean = false;

	function calculateTransform(
		i: number,
		currentPage: number,
		angle: number,
		currentSize: { w: number; h: number },
		otherSize: { w: number; h: number }
	) {
		if (i === currentPage) {
			return `rotateY(${angle}deg) translateX(0)`;
		} else if (i < currentPage) {
			return `translateX(calc(${-(currentPage - i)} * (${otherSize.w}px * 1.1)))`;
		} else {
			return `translateX(calc((100% * ${i - currentPage} * 1.1) + ${
				currentSize.w - otherSize.w
			}px))`;
		}
	}

	function onPointermoveHandler(e: any) {
		const pageX = e.pageX;
		const box = e.currentTarget.getBoundingClientRect();
		const centerPosition = {
			x: box.left + box.width / 2,
			y: box.top + box.height / 2
		};

		angle = Math.atan2(pageX - centerPosition.x, 0) * (30 / Math.PI);
	}

	function onPointerOutHandler(e: any) {
		angle = 0;
	}

	function onTransitionHandler(e: any, mode: 'start' | 'end') {
		const computedStyle = getComputedStyle(e.currentTarget);
		const transformMatrix = computedStyle.transform.split(', ');
		const translateXValue = parseFloat(transformMatrix[4]);
		const initialTranslateX = 0;

		if (e.propertyName === 'transform' && translateXValue !== initialTranslateX) {
			isTranslateXEnd = mode === 'start' ? false : true;
		}
	}

	function movePage(p: number) {
		currentPage = p;
	}
</script>

<div class="relative" style:min-height="{currentSize.h}px" style:perspective="{perspective}px">
	{#each articles as article, i (article.id)}
		<div
			class="absolute top-0 left-0 flex-none transition-all ease-in-out border border-surface-900-50-token overflow-hidden"
			style:width={i === currentPage ? `${currentSize.w}px` : `${otherSize.w}px`}
			style:height={i === currentPage ? `${currentSize.h}px` : `${otherSize.h}px`}
			style:transform={calculateTransform(i, currentPage, angle, currentSize, otherSize)}
			style:transition-duration="{duration}ms"
			style:pointer-events={i === currentPage ? 'auto' : 'none'}
			on:pointermove={i === currentPage && isTranslateXEnd ? onPointermoveHandler : undefined}
			on:pointerleave={i === currentPage ? onPointerOutHandler : undefined}
			on:transitionstart={(e) => onTransitionHandler(e, 'start')}
			on:transitionend={(e) => onTransitionHandler(e, 'end')}
		>
			<div
				class="absolute top-1/2 z-20 -translate-y-1/2 space-y-4 px-5 transition-all ease-in-out {i ===
				currentPage
					? 'opacity-100'
					: 'opacity-0'}"
				style:width="{currentSize.w}px"
				style:transition-duration="{duration}ms"
			>
				<div class="space-y-2">
					<UserAvatar
						src={article.user.profile?.avatar}
						name={article.user.profile?.nickname}
						width="w-7"
						nameClasses="text-sm"
					/>

					<h3 class="font-medium break-all line-clamp-3">{article.title}</h3>

					<div class="flex flex-wrap gap-2">
						<a
							href="/article/{categories[article.category].slug}"
							class="badge variant-filled-primary">{categories[article.category].title}</a
						>
						{#if article.tags.length > 0}
							<a
								href="/tag/{article.tags[0].slug}"
								class="block badge variant-filled max-w-[110px] text-ellipsis overflow-hidden"
								>{article.tags[0].name}</a
							>
						{/if}
					</div>
				</div>

				<div class="flex justify-center">
					<button class="btn variant-filled-surface shadow-lg">
						<span class="text-sm">View</span>
						<span><ArrowRightIcon class="w-6 h-6" /></span>
					</button>
				</div>
			</div>

			<div
				class="w-full h-full"
				style:filter={i === currentPage ? 'brightness(50%)' : 'brightness(90%)'}
				style:transition-duration="{duration}ms"
			>
				{#if article.coverImage}
					<figure class="w-full h-full">
						<img
							src={`${article.coverImage}?w=${currentSize.w}&h=${currentSize.h}&q=80&f=webp`}
							alt={article.title}
							width={currentSize.w}
							height={currentSize.h}
							class="flex-initial transition-all ease-in-out"
							style:aspect-ratio={currentSize.w / currentSize.h}
						/>
					</figure>
				{:else}
					<div class="w-full h-full flex items-center justify-center bg-surface-700">
						<ImageIcon class="w-20 h-20" />
					</div>
				{/if}
			</div>
		</div>
	{/each}
</div>

<div class="mt-6 flex items-center justify-center gap-3 xl:absolute xl:right-0 xl:bottom-0">
	<button
		disabled={currentPage === 0 ? true : false}
		class="btn btn-icon btn-icon-sm variant-ringed-tertiary z-20"
		on:click={() => movePage(currentPage - 1)}
	>
		<ArrowLeftSmall />
	</button>

	{#each Array.from({ length: articles.length }) as _, i (i)}
		<div
			class="w-2 h-2 rounded-full transition-colors ease-in-out {i === currentPage
				? 'bg-surface-50'
				: 'bg-surface-50/25'}"
		/>
	{/each}

	<button
		disabled={currentPage === articles.length - 1 ? true : false}
		class="btn btn-icon btn-icon-sm variant-ringed-tertiary z-20"
		on:click={() => movePage(currentPage + 1)}
	>
		<ArrowRightSmall />
	</button>
</div>
