<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import ArrowRight from '~icons/ri/arrow-right-s-fill';
	import ArrowLeft from '~icons/ri/arrow-left-s-fill';

	export let maxIndex: number;
	export let carouselIndex: number = 0;
	let interval: NodeJS.Timer;

	function startInterval() {
		interval = setInterval(() => {
			if (carouselIndex === maxIndex - 1) {
				carouselIndex = 0;
			} else {
				carouselIndex++;
			}
		}, 3500);
	}

	function onClickNext() {
		clearInterval(interval);
		if (carouselIndex === maxIndex - 1) {
			carouselIndex = 0;
		} else {
			carouselIndex++;
		}

		startInterval();
	}

	function onClickPrev() {
		clearInterval(interval);
		if (carouselIndex === 0) {
			carouselIndex = maxIndex - 1;
		} else {
			carouselIndex--;
		}

		startInterval();
	}

	function onClickTab() {
		clearInterval(interval);
		startInterval();
	}

	onMount(() => {
		startInterval();
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div class="lg:absolute w-full grid grid-cols-[15%_70%_15%] items-center py-4 px-0 sm:px-4">
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
			{#each Array.from({ length: maxIndex }) as _, index (index)}
				<Tab
					bind:group={carouselIndex}
					name="tab{index}"
					value={index}
					on:click={() => onClickTab()}
				>
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
