<script lang="ts">
	import ArrowLeftSmall from '$components/@icons/ArrowLeftSmall.svelte';
	import ArrowRightSmall from '$components/@icons/ArrowRightSmall.svelte';
	import UserAvatar from '$components/@ui/UserAvatar.svelte';
	import ArrowRightIcon from '$components/@icons/ArrowRightIcon.svelte';
	import Separator from '$components/@ui/Separator.svelte';

	export let articles: any;

	let angle: number = 0;
	let page: number = 0;
	let transition: boolean = true;

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

	function movePage(p: number) {
		page = p;
	}

	$: console.log(transition);
</script>

<div class="relative min-h-[405px] [perspective:1200px]">
	{#each articles as article, index (article.id)}
		<div
			class="absolute top-0 left-0 flex-none transition-all duration-[1000ms] ease-in-out border border-surface-900-50-token w-[200px] h-[300px] {page ===
			index
				? ''
				: 'pointer-events-none'}"
			on:pointermove={index === page && transition ? onPointermoveHandler : undefined}
			on:pointerout={index === page ? onPointerOutHandler : undefined}
			on:transitionstart={(e) => {
				const computedStyle = getComputedStyle(e.currentTarget);
				const transformMatrix = computedStyle.transform.split(', ');
				const translateXValue = parseFloat(transformMatrix[4]);
				const initialTranslateX = 0;

				if (e.propertyName === 'transform' && translateXValue !== initialTranslateX) {
					transition = false;
				}
			}}
			on:transitionend={(e) => {
				const computedStyle = getComputedStyle(e.currentTarget);
				const transformMatrix = computedStyle.transform.split(', ');
				const translateXValue = parseFloat(transformMatrix[4]);
				const initialTranslateX = 0;

				if (e.propertyName === 'transform' && translateXValue !== initialTranslateX) {
					transition = true;
				}
			}}
			style={index === page
				? `width: 270px; height: 405px; z-index: 10; transform: rotateY(${angle}deg) translateX(0)`
				: index < page
				? `transform: translateX(calc(${-(page - index)} * (200px * ${
						page - index === 1 ? 1.1 : 1.1
				  })))`
				: `transform: translateX(calc((100% * ${index - page} * 1.1) + 70px))`}
		>
			<div
				class="absolute top-1/2 z-20 -translate-y-1/2 w-[270px] space-y-4 transition-all duration-[1000ms] ease-in-out px-5 {index ===
				page
					? 'opacity-100'
					: 'opacity-0'}"
			>
				<div class="space-y-2">
					<div class="flex items-center gap-2">
						<UserAvatar src={article.author.avatar} width="w-7" />
						<span class="text-sm">{article.author.nickname}</span>
					</div>

					<h3 class="text-base font-medium break-all line-clamp-3">
						{article.title} Next.js 보다 더 나은 점이 무엇일까요? 그 궁금증을 풀어드립니다.
					</h3>

					<div class="flex flex-wrap gap-2">
						<span class="badge variant-filled-primary">프론트엔드</span>
						<span class="badge variant-filled">{article.tags[0]}</span>
					</div>
				</div>

				<div class="flex justify-center">
					<button class="btn variant-filled-surface shadow-lg">
						<span class="text-sm">View</span>
						<span class="badge-icon"><ArrowRightIcon /></span>
					</button>
				</div>
			</div>

			<img
				src={`${article.coverImage}?w=270&h=405&q=80&f=webp`}
				alt="article-cover"
				class={`flex-initial block aspect-[200/300] transition-all duration-[1000ms] ease-in-out ${
					index === page ? `brightness-50 opacity-100` : `brightness-90 opacity-[0.65]`
				}`}
			/>
		</div>
	{/each}
</div>

<div class="mt-6 flex items-center justify-center gap-3 xl:absolute xl:right-0 xl:bottom-0">
	<button
		disabled={page === 0 ? true : false}
		class="btn btn-icon btn-icon-sm variant-ringed-tertiary z-20"
		on:click={() => movePage(page - 1)}
	>
		<ArrowLeftSmall />
	</button>

	{#each Array.from({ length: articles.length }) as _, i (i)}
		<div
			class="w-2 h-2 rounded-full {i === page
				? 'bg-surface-50'
				: 'bg-surface-50/25'} transition-colors ease-in-out"
		/>
	{/each}

	<button
		disabled={page === articles.length - 1 ? true : false}
		class="btn btn-icon btn-icon-sm variant-ringed-tertiary z-20"
		on:click={() => movePage(page + 1)}
	>
		<ArrowRightSmall />
	</button>
</div>
