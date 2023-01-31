<script lang="ts">
	import type { PageData } from './$types';

	import Article from '$components/Article/Article.svelte';

	export let data: PageData;

	let articles = data.articles;
</script>

<ul>
	{#each articles as article, index (index)}
		<li>
			<Article {article} />
			<hr />
		</li>
	{/each}
</ul>
