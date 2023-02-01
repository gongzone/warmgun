<script lang="ts">
	import type { PageData } from './$types';

	import Article from '$components/Article/Article.svelte';

	export let data: PageData;

	let blogUsername = data.blogUser.blogUsername;
	let articles = data.articles;
</script>

<ul>
	{#each articles as article, index (index)}
		<li>
			<Article article={{ ...article, slug: `/@${blogUsername}/${article.slug}` }} />
			<hr />
		</li>
	{/each}
</ul>
