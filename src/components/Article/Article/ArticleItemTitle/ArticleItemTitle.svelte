<script lang="ts">
	export let slug: string;
	export let title: string;
</script>

<a href={slug}>
	<h3 class="line-clamp-2 text-xl">{title}</h3>
</a>
