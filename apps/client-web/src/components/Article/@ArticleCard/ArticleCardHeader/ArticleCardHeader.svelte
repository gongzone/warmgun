<script lang="ts">
	import coloredPattern from '$lib/images/colored-pattern.svg';

	export let coverImage: string | null;
	export let slug: string;
</script>

<header>
	<a class="unstyled" href={slug}>
		<img
			src={coverImage ? `${coverImage}?w=400&h=172&q=80&f=webp` : coloredPattern}
			class="bg-black/50 w-full aspect-[21/9]"
			alt="article-cover"
		/>
	</a>
</header>
