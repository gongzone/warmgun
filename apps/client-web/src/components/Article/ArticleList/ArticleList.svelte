<script lang="ts">
	import type { Article } from '$api/article';

	import ArticleListHeader from './ArticleListHeader/ArticleListHeader.svelte';
	import ArticleListImage from './ArticleListImage/ArticleListImage.svelte';
	import ArticleListContent from './ArticleListContent/ArticleListContent.svelte';
	import ArticleListFooter from './ArticleListFooter/ArticleListFooter.svelte';

	export let article: Article;

	$: ({ title, subTitle, coverImage, slug, createdAt, tags, author, likeCount, commentCount } =
		article);
</script>

<div class="flex flex-col px-4">
	<div class="mb-4">
		<ArticleListHeader
			{likeCount}
			{commentCount}
			avatar={author.avatar}
			username={author.username}
			nickname={author.nickname}
			createdAt={new Date(createdAt)}
		/>
	</div>

	<div class="flex items-center justify-between gap-6">
		<div class="px-8">
			<ArticleListContent {title} {subTitle} {slug} />
		</div>
		<ArticleListImage {title} {coverImage} {slug} />
	</div>

	<div class="px-8 mt-6">
		<ArticleListFooter {tags} />
	</div>
</div>
