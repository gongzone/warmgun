<script lang="ts">
	import type { Article } from '$lib/types/article';
	import UserAvatar from '$components/@ui/UserAvatar.svelte';

	import TextWithIcon from '$components/@ui/TextWithIcon.svelte';
	import HeartIcon from '$components/@icons/HeartIcon.svelte';
	import CommentIcon from '$components/@icons/CommentIcon.svelte';
	import { formatCount, formatDate } from '$lib/utils/format';
	import ImageIcon from '$components/@icons/editor/ImageIcon.svelte';
	import Image from '$components/@ui/Image.svelte';
	import { categories } from '$lib/constants/categories';

	export let article: Article;
	export let displayUserInfo: boolean = true;

	$: ({ title, excerpt, category, coverImage, user, slug, createdAt } = article);

	$: articleSlug = `/@${article.user.username}/${article.slug}`;
</script>

<div class="flex flex-col">
	{#if displayUserInfo}
		<header class="flex items-center gap-2">
			<a href="/@{user.username}" class="flex items-center gap-2">
				<UserAvatar name={user.profile?.nickname} src={user.profile?.avatar} width="w-8" />
			</a>
			<span class="opacity-75">·</span>
			<span class="text-sm font-extralight">{formatDate(createdAt)}</span>
		</header>
	{/if}

	<div class="my-1" />

	<a href={articleSlug}>
		{#if coverImage}
			<div class="w-full h-full rounded-2xl shadow-xl overflow-hidden">
				<Image
					loading="lazy"
					src={`${coverImage}?w=560&h=420&q=80&f=webp`}
					alt="cover"
					class="aspect-[560/420] transition-all duration-500 ease-in-out hover:saturate-150 hover:scale-105"
					width={560}
					height={420}
				/>
			</div>
		{:else}
			<div
				class="flex items-center justify-center aspect-[560/420] rounded-2xl shadow-xl bg-surface-700"
			>
				<ImageIcon class="w-20 h-20" />
			</div>
		{/if}
	</a>

	<div class="my-1" />

	<div class="flex flex-col gap-1">
		<a href={articleSlug}>
			<h3 class="line-clamp-2 text-xl font-medium">{title}</h3>
		</a>
		<a href={articleSlug}>
			<p class="line-clamp-3 font-extralight">{excerpt}</p>
		</a>
	</div>

	<div class="my-1" />

	<footer class="flex items-center justify-between flex-wrap gap-2">
		<ul class="flex gap-2">
			<li>
				<a class="badge variant-filled-primary" href="/article/{categories[category].slug}"
					>{categories[category].title}</a
				>
			</li>
			{#if article.tags.length > 0}
				<li>
					<a class="badge variant-filled xl:max-w-[110px]" href="/tag/{article.tags[0].slug}">
						<p class="text-ellipsis overflow-hidden">{article.tags[0].name}</p>
					</a>
				</li>
			{/if}
		</ul>

		<div class="flex items-center gap-2">
			<TextWithIcon
				icon={HeartIcon}
				size="sm"
				gap={1}
				iconClasses="text-red-500"
				textClasses="font-extralight text-sm">{formatCount(article._count.likes)}</TextWithIcon
			>
			<TextWithIcon icon={CommentIcon} size="sm" gap={1} textClasses="font-thin text-sm"
				>{formatCount(article._count.comments)}</TextWithIcon
			>
		</div>
	</footer>
</div>
