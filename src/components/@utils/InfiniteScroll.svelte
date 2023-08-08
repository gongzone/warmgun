<script lang="ts">
	import { browser } from '$app/environment';
	import { onDestroy, onMount } from 'svelte';

	export let fetchFn: any;
	export let hasNextPage: boolean | undefined;
	export let root: Element | null = null;

	let observer: IntersectionObserver;
	let observable: Element;

	onMount(() => {
		if (browser) {
			observer = new IntersectionObserver(
				(entries, observer) => {
					if (!hasNextPage) {
						return;
					}

					if (entries[0].isIntersecting && hasNextPage) {
						fetchFn();
					}
				},

				{
					root: root,
					threshold: 0.5,
					rootMargin: '0px'
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
