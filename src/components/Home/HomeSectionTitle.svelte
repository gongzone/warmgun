<script lang="ts">
	import ArrowRightSmall from '$components/@icons/ArrowRightSmall.svelte';

	export let title: string;
	export let subTitle: string;
	export let href: string;
</script>

<div class="flex flex-col mb-8">
	<a class="inline-flex items-center" {href}>
		<span class="text-3xl font-bold">{title}</span>
		<span><ArrowRightSmall class="w-10 h-10" /></span>
	</a>
	<span class="font-extralight">{subTitle}</span>
</div>
