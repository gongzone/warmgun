<script lang="ts">
	import type { Article } from '$lib/types/article';

	import ArticleItemHeader from './ArticleItemHeader/ArticleItemHeader.svelte';
	import ArticleItemImage from './ArticleItemImage/ArticleItemImage.svelte';
	import ArticleItemTitle from './ArticleItemTitle/ArticleItemTitle.svelte';
	import ArticleItemExcerpt from './ArticleItemExcerpt/ArticleItemExcerpt.svelte';
	import ArticleItemTag from './ArticleItemTag/ArticleItemTag.svelte';
	import ArticleItemFooter from './ArticleItemFooter/ArticleItemFooter.svelte';
	import TextWithIcon from '$components/@ui/TextWithIcon.svelte';
	import HeartIcon from '$components/@icons/HeartIcon.svelte';
	import CommentIcon from '$components/@icons/CommentIcon.svelte';
	import { formatCount } from '$lib/utils/format';

	export let article: Article;
	export let displayUserInfo: boolean = true;

	$: articleSlug = `/@${article.author.username}/${article.slug}`;
</script>

<div class="flex flex-col gap-4">
	{#if displayUserInfo}
		<ArticleItemHeader
			username={article.author.username}
			nickname={article.author.profile?.nickname}
			field={article.author.profile?.field}
			avatar={article.author.profile?.avatar}
			createdAt={article.createdAt}
			likeCount={article._count.likes}
			commentCount={article._count.comments}
		/>
	{/if}

	<ArticleItemImage slug={articleSlug} coverImage={article.coverImage} />

	<div class="flex flex-col gap-1">
		<ArticleItemTitle slug={articleSlug} title={article.title} />
		<ArticleItemExcerpt slug={articleSlug} excerpt={article.excerpt} />
	</div>

	<div class="flex items-center justify-between">
		<ul class="flex list-none flex-wrap gap-2">
			{#each article.tags as tag (tag.id)}
				<li>
					<ArticleItemTag name={tag.name} slug={tag.slug} />
				</li>
			{/each}
		</ul>

		<div class="flex items-center gap-2">
			<TextWithIcon
				icon={HeartIcon}
				size="sm"
				gap={1}
				iconClass="text-red-500"
				textClass="font-thin text-sm">{formatCount(article._count.likes)}</TextWithIcon
			>
			<TextWithIcon icon={CommentIcon} size="sm" gap={1} textClass="font-thin text-sm"
				>{formatCount(article._count.comments)}</TextWithIcon
			>
		</div>
	</div>

	<!-- {#if displayUserInfo}
		<ArticleItemFooter
			createdAt={article.createdAt}
			likeCount={article._count.likes}
			commentCount={article._count.comments}
			username={article.author.username}
			nickname={article.author.profile?.nickname}
			field={article.author.profile?.field}
			avatar={article.author.profile?.avatar}
		/>
	{/if} -->
</div>
