<script lang="ts">
	import { ArrowIcons } from '$components/@icons/arrow';

	export let title: string;
	export let subTitle: string;
	export let link: string;
</script>

<div class="mb-8">
	<a class="inline-flex items-center gap-1" href={link}>
		<span class="text-3xl font-bold">{title}</span>
		<span><ArrowIcons.chevronDoubleRight class="w-7 h-7" /></span>
	</a>
	<span class="block font-extralight">{subTitle}</span>
</div>
