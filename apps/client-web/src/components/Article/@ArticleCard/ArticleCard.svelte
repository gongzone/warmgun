<script lang="ts">
	import type { Article } from '$lib/types/api';
	import ArticleCardHeader from './ArticleCardHeader/ArticleCardHeader.svelte';
	import ArticleCardContent from './ArticleCardContent/ArticleCardContent.svelte';
	import ArticleCardTags from './ArticleCardTags/ArticleCardTags.svelte';
	import ArticleCardFooter from './ArticleCardFooter/ArticleCardFooter.svelte';

	export let article: Article;

	$: ({ title, subTitle, coverImage, slug, createdAt, tags, author, _count } = article);
</script>

<div class="card flex flex-col overflow-hidden">
	<ArticleCardHeader {coverImage} {slug} />
	<ArticleCardContent {title} {subTitle} {slug} date={new Date(createdAt)} />
	<div class="mt-auto mb-4">
		<ArticleCardTags {tags} />
	</div>
	<ArticleCardFooter
		username={author.username}
		nickname={author.profile.nickname}
		avatar={author.profile.avatar}
		likesCount={_count.likes}
		commentsCount={_count.comments}
	/>
</div>
