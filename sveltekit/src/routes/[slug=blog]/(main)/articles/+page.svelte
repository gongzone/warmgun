<script lang="ts">
	import type { PageData } from './$types';

	import Article from '$components/Article/Article.svelte';

	export let data: PageData;
</script>

{#if data.articles.length > 0}
	<ul>
		{#each data.articles as article, index (index)}
			<li>
				<Article {article} />
				<hr />
			</li>
		{/each}
	</ul>
{:else}
	<div>글이 없네요...</div>
{/if}
