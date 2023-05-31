<script lang="ts">
	import { enhance } from '$app/forms';

	import type { BlogUser } from '$lib/types/user';
	import type { Article } from '$lib/types/article';
	import { formatDate } from '$lib/utils/format';
	import { siteConfig } from '$lib/configs/site';

	import TimeIcon from '$components/@icons/TimeIcon.svelte';
	import CalendarIcon from '$components/@icons/CalendarIcon.svelte';
	import UserAvatar from '$components/@ui/UserAvatar.svelte';
	import TextWithIcon from '$components/@ui/TextWithIcon.svelte';
	import HeartIcon from '$components/@icons/HeartIcon.svelte';
	import CommentIcon from '$components/@icons/CommentIcon.svelte';
	import ArticleControlPopup from '$components/@ui/Popup/ArticleControlPopup.svelte';

	export let blogUser: BlogUser;
	export let article: Article;
	export let isOwner: boolean;
	export let isLiked: boolean;

	$: genre = siteConfig.genre.find((genre) => genre.enum === article.genre);
	$: likesAction = isLiked ? '?/unlike' : '?/like';
</script>

<div class="mb-4 space-y-4">
	<div class="flex items-center flex-wrap gap-3 md:gap-4">
		<div class="flex items-center gap-2">
			<UserAvatar src={blogUser.profile?.avatar} />
			<div class="flex flex-col">
				<span class="font-bold">{blogUser.profile?.nickname}</span>
				<span class="text-sm font-thin">{blogUser.profile?.field}</span>
			</div>
		</div>

		<span class="opacity-70 font-thin">|</span>

		<TextWithIcon icon={TimeIcon} textClass="!text-sm">{article.readingTime} Min</TextWithIcon>

		<span class="opacity-70 font-thin">|</span>

		<TextWithIcon icon={CalendarIcon} textClass="!text-sm"
			>{formatDate(article.createdAt)}</TextWithIcon
		>
	</div>

	<h2 class="text-2xl md:text-4xl font-bold">
		{article.title}
	</h2>

	<div>
		<ul class="flex flex-wrap gap-2">
			<li>
				<a href={genre?.href} class="badge variant-filled-primary">
					{genre?.title}
				</a>
			</li>
			{#each article.tags as tag (tag.id)}
				<li>
					<a href={`/tags/${tag.slug}`} class="badge variant-filled">
						{tag.name}
					</a>
				</li>
			{/each}
		</ul>
	</div>
	<div
		class="flex justify-between border-t border-b py-2 border-t-surface-500 border-b-surface-500"
	>
		<div class="flex items-center gap-4">
			<form method="POST" action={likesAction} class="flex items-center" use:enhance>
				<input type="hidden" name="articleId" value={article.id} />
				<button type="submit">
					<TextWithIcon
						icon={HeartIcon}
						iconClass={isLiked ? 'text-red-500' : ''}
						size="xl"
						textClass="!text-sm"
						gap={1}>{article._count.likes}</TextWithIcon
					>
				</button>
			</form>
			<a href="#comment-container">
				<TextWithIcon icon={CommentIcon} textClass="!text-sm" size="xl" gap={1}
					>{article._count.comments}</TextWithIcon
				>
			</a>
		</div>

		<div>
			{#if isOwner}
				<ArticleControlPopup articleId={article.id} />
			{/if}
		</div>
	</div>
</div>

<div class="flex flex-col gap-6">
	<div class="aspect-[1200/840] overflow-hidden rounded-lg">
		<img
			class="w-full h-full rounded-lg object-cover object-center"
			src={`${article.coverImage}?w=1200&h=840&q=80&f=webp`}
			alt={article.title}
		/>
	</div>
</div>
