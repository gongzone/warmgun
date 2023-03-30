<script lang="ts">
	import { browser } from '$app/environment';
	import { onDestroy, onMount } from 'svelte';

	export let fetchFn: any;
	export let hasNextPage: boolean | undefined;

	let observer: IntersectionObserver;
	let observable: Element;

	onMount(() => {
		if (browser) {
			observer = new IntersectionObserver(
				(entries, observer) => {
					console.log(hasNextPage);
					if (!hasNextPage) {
						observer.unobserve(observable);
					}

					if (entries[0].isIntersecting && hasNextPage) {
						console.log('Infinite fetch!');
						fetchFn();
					}
				},
				{
					threshold: 0.5,
					rootMargin: '-100% 0% 100%'
				}
			);

			observer.observe(observable);
		}
	});

	onDestroy(() => {
		if (observer) {
			observer.disconnect();
		}
	});
</script>

<div bind:this={observable} />
