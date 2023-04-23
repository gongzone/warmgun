<script lang="ts">
	import coloredPattern from '$lib/images/colored-pattern.svg';

	export let coverImage: string | null;
	export let slug: string;
</script>

<div class="rounded-lg shrink-0 overflow-hidden">
	<a class="unstyled" href={slug}>
		<img
			class="w-[200px] h-[134px] aspect-[200/134]"
			src={coverImage ? `${coverImage}?w=200&h=134&q=80&f=webp` : coloredPattern}
			alt="cover"
		/>
	</a>
</div>
