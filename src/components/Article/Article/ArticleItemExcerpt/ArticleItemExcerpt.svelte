<script lang="ts">
	export let slug: string;
	export let excerpt: string;
</script>

<a href={slug}>
	<p class="line-clamp-3 font-thin text-sm">{excerpt}</p>
</a>
