<script lang="ts">
	import type { Article } from '$api/article';
	import ArticleCardHeader from './ArticleCardHeader/ArticleCardHeader.svelte';
	import ArticleCardContent from './ArticleCardContent/ArticleCardContent.svelte';
	import ArticleCardTags from './ArticleCardTags/ArticleCardTags.svelte';
	import ArticleCardFooter from './ArticleCardFooter/ArticleCardFooter.svelte';

	export let article: Article;

	$: ({ title, subTitle, coverImage, slug, createdAt, tags, author, likeCount, commentCount } =
		article);
</script>

<div class="card flex flex-col overflow-hidden">
	<ArticleCardHeader {coverImage} {slug} />
	<ArticleCardContent {title} {subTitle} {slug} date={new Date(createdAt)} />
	<ArticleCardTags {tags} />
	<ArticleCardFooter
		username={author.username}
		nickname={author.nickname}
		avatar={author.avatar}
		{likeCount}
		{commentCount}
	/>
</div>
