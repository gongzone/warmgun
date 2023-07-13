<script lang="ts">
	import Button from '$components/@ui/Test/Button.svelte';
	import type { Article } from '$lib/types/article';

	export let articles: Article[];
	let angle: number = 0;
	let page: number = 0;

	function onPointermoveHandler(e: any) {
		const pageX = e.pageX;
		const box = e.currentTarget.getBoundingClientRect();
		const centerPosition = {
			x: box.left + box.width / 2,
			y: box.top + box.height / 2
		};

		angle = Math.atan2(pageX - centerPosition.x, 0) * (30 / Math.PI);
		console.log(angle);
	}

	function onPointerOutHandler(e: any) {
		angle = 0;
	}

	function movePage(p: number) {
		page = p;
		console.log(page);
	}
</script>

<div
	class="relative w-full h-full flex items-center justify-start gap-2 [perspective:1200px] min-h-[405px]"
>
	<Button class="absolute left-0 z-20" on:click={() => movePage(page - 1)}>이전</Button>

	{#each articles as article, index (article.id)}
		<div
			class="absolute top-0 left-0 flex-none transition-all duration-[1000ms] ease-in-out border border-foreground w-[200px] h-[300px]"
			on:pointermove={index === page ? onPointermoveHandler : undefined}
			on:pointerout={index === page ? onPointerOutHandler : undefined}
			style={index === page
				? `width: 270px; height: 405px; z-index: 10; transform: rotateY(${angle}deg) translateX(0)`
				: index < page
				? `opacity: 0.61; transform: translateX(calc(${-(page - index)} * (200px * ${
						page - index === 1 ? 1.1 : 1.1
				  })))`
				: `opacity: 0.61; transform: translateX(calc((100% * ${index - page} * 1.1) + 70px))`}
		>
			<img
				src={`${article.coverImage}?w=270&h=405&q=80&f=webp`}
				alt="article-cover"
				class={`flex-initial block aspect-[200/300] `}
			/>
		</div>
	{/each}

	<Button class="absolute right-0" on:click={() => movePage(page + 1)}>다음으로</Button>
</div>

<style>
	.card-current {
		width: 270px;
		height: 405px;
		transform: translateX(0);
	}

	.card-left {
		width: 200px;
		height: 300px;
		transform: translateX(calc(-1 * (200 * 1.1)));
	}

	.card-right {
		width: 200px;
		height: 300px;
		transform: translateX(calc(200 * 1.1));
	}
</style>
