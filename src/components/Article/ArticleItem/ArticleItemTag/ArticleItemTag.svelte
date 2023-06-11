<script lang="ts">
	export let name: string;
	export let slug: string;
</script>

<a href={`/tags/${slug}`} class="btn btn-sm variant-ringed-tertiary text-sm">
	{name}
</a>
