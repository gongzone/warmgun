<script lang="ts">
	import type { Article } from '$lib/types/article';

	import { formatDate } from '$lib/utils/format';
	import ArticleItemHeader from './ArticleItemHeader/ArticleItemHeader.svelte';
	import ArticleItemImage from './ArticleItemImage/ArticleItemImage.svelte';
	import ArticleItemTitle from './ArticleItemTitle/ArticleItemTitle.svelte';
	import ArticleItemExcerpt from './ArticleItemExcerpt/ArticleItemExcerpt.svelte';
	import ArticleItemTag from './ArticleItemTag/ArticleItemTag.svelte';
	import ArticleItemFooter from './ArticleItemFooter/ArticleItemFooter.svelte';

	export let article: Article;

	$: articleSlug = `/@${article.author.username}/${article.slug}`;
</script>

<div class="flex flex-col gap-4">
	<ArticleItemHeader
		username={article.author.username}
		nickname={article.author.profile?.nickname}
		field={article.author.profile?.field}
		avatar={article.author.profile?.avatar}
	/>

	<ArticleItemImage slug={articleSlug} coverImage={article.coverImage} />

	<div class="flex flex-col gap-1">
		<ArticleItemTitle slug={articleSlug} title={article.title} />
		<ArticleItemExcerpt slug={articleSlug} excerpt={article.excerpt} />
	</div>

	<ul class="flex list-none flex-wrap gap-2">
		{#each article.tags as tag (tag.id)}
			<li>
				<ArticleItemTag name={tag.name} slug={tag.slug} />
			</li>
		{/each}
	</ul>

	<ArticleItemFooter
		createdAt={article.createdAt}
		likeCount={article._count.likes}
		commentCount={article._count.comments}
	/>
</div>
