<script lang="ts">
	import type { BlogUser } from '$lib/types/user';
	import type { Article } from '$lib/types/article';
	import { formatDate } from '$lib/utils/format';
	import { siteConfig } from '$lib/configs/site';

	import TimeIcon from '$components/@icons/TimeIcon.svelte';
	import CalendarIcon from '$components/@icons/CalendarIcon.svelte';
	import UserAvatar from '$components/@ui/UserAvatar.svelte';
	import TextWithIcon from '$components/@ui/TextWithIcon.svelte';
	import ArticleStats from '../_ArticleStats/ArticleStats.svelte';
	import Image from '$components/@ui/Image.svelte';

	export let blogUser: BlogUser;
	export let article: Article;
	export let isOwner: boolean;
	export let isLiked: boolean;

	$: genre = siteConfig.genre.find((genre) => genre.enum === article.genre);
</script>

<div class="mb-4 space-y-4">
	<div class="flex items-center flex-wrap gap-3 md:gap-4">
		<a href="/@{blogUser.username}" class="flex items-center gap-2">
			<UserAvatar src={blogUser.profile?.avatar} />
			<div class="flex flex-col">
				<span class="font-bold">{blogUser.profile?.nickname}</span>
				<span class="text-sm font-thin">{blogUser.profile?.field}</span>
			</div>
		</a>

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

	<ArticleStats {article} {isOwner} {isLiked} />
</div>

<div class="flex flex-col gap-6">
	{#if article.coverImage}
		<div class="aspect-[1200/840] overflow-hidden rounded-lg">
			<Image
				class="w-full h-full rounded-lg object-cover object-center"
				src={`${article.coverImage}?w=1200&h=840&q=80&f=webp`}
				alt={article.title}
			/>
		</div>
	{/if}
</div>
