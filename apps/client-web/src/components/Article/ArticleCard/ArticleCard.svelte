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
	<ArticleCardHeader coverImage={'https://source.unsplash.com/random/1280x540?skeleton'} />
	<ArticleCardContent {title} {subTitle} date={createdAt} />
	<ArticleCardTags {tags} />
	<ArticleCardFooter
		writerAvatar={author.avatar}
		writerName={author.nickname}
		likesCount={likeCount}
		commentsCount={commentCount}
	/>
</div>
