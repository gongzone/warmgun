<script lang="ts">
	export let slug: string;
	export let coverImage: string | null | undefined;
</script>

<a href={slug}>
	<img
		src={coverImage ? `${coverImage}?w=560&h=420&q=80&f=webp` : ''}
		alt="cover"
		class="aspect-[560/420] rounded-2xl shadow-xl"
	/>
</a>
