<script lang="ts">
	import coloredPattern from '$lib/images/colored-pattern.svg';

	export let title: string;
	export let coverImage: string | null;
	export let slug: string;
</script>

<a class="unstyled rounded-lg shrink-0 overflow-hidden" href={slug}>
	<img
		class="w-[200px] h-[134px] aspect-[200/134]"
		src={coverImage ? `${coverImage}?w=200&h=134&q=80&f=webp` : coloredPattern}
		alt={title}
	/>
</a>
