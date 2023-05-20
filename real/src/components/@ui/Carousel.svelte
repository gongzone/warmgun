<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	import ArrowLeftSmall from '$components/@icons/ArrowLeftSmall.svelte';
	import ArrowRightSmall from '$components/@icons/ArrowRightSmall.svelte';

	export let items: any[];
	export let bottomClass = '';

	let carouselIndex: number = 0;
	let intervalId: NodeJS.Timer;

	function moveTo(i: number) {
		if (!items) return;

		if (i === items.length) {
			carouselIndex = 0;
		} else if (i === -1) {
			carouselIndex = items.length - 1;
		} else {
			carouselIndex = i;
		}
	}

	function startInterval() {
		intervalId = setInterval(() => {
			moveTo(carouselIndex + 1);
		}, 3500);
	}

	function stopInterval() {
		if (intervalId) clearInterval(intervalId);
	}

	function intervalAction(i: number) {
		stopInterval();
		moveTo(i);
		startInterval();
	}

	onMount(() => {
		startInterval();
	});

	onDestroy(() => {
		stopInterval();
	});
</script>

<ul>
	{#each items as item, index (index)}
		<li
			class="w-full transition-all ease-in-out duration-[800ms] {carouselIndex === index
				? 'relative visible opacity-100 -z-10'
				: 'invisible opacity-0 absolute top-0 translate-y-6 translate-x-4 pointer-events-none -z-10'}"
		>
			<slot {item} />
		</li>
	{/each}
</ul>

<div class="w-full grid grid-cols-[15%_70%_15%] items-center py-4 px-0 sm:px-4 {bottomClass}">
	<button
		class="btn-icon variant-filled-primary place-self-center"
		on:click={() => intervalAction(carouselIndex + 1)}
	>
		<ArrowLeftSmall />
	</button>

	<div class="flex justify-between items-center mx-4 md:mx-8">
		{#each Array.from({ length: items.length }) as _, index (index)}
			<button on:click={() => intervalAction(index)}>
				<div
					class="w-2 h-2 rounded-full transition-colors ease-in duration-200 hover:bg-primary-500 {carouselIndex ===
					index
						? 'bg-primary-500'
						: 'bg-surface-50'}"
				/>
			</button>
		{/each}
	</div>

	<button
		class="btn-icon variant-filled-primary place-self-center"
		on:click={() => intervalAction(carouselIndex - 1)}
	>
		<ArrowRightSmall />
	</button>
</div>
