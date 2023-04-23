<script lang="ts">
	import type { Article } from '$lib/types/api';

	import ArticleListHeader from './ArticleListHeader/ArticleListHeader.svelte';
	import ArticleListImage from './ArticleListImage/ArticleListImage.svelte';
	import ArticleListContent from './ArticleListContent/ArticleListContent.svelte';
	import ArticleListFooter from './ArticleListFooter/ArticleListFooter.svelte';

	export let article: Article;

	$: ({ title, subTitle, coverImage, slug, createdAt, tags, author, _count } = article);
</script>

<div class="flex flex-col">
	<ArticleListHeader
		username={author.username}
		nickname={author.profile.nickname}
		avatar={author.profile.avatar}
		createdAt={new Date(createdAt)}
		likesCount={_count.likes}
		commentsCount={_count.comments}
	/>

	<div
		class="flex flex-col-reverse justify-between gap-6 mt-1 pt-2 sm:flex-row sm:items-center sm:pt-0"
	>
		<ArticleListContent {title} {subTitle} {slug} />
		<ArticleListImage {coverImage} {slug} />
	</div>

	<div class="mt-4">
		<ArticleListFooter {tags} />
	</div>

	<hr class="my-6" />
</div>
