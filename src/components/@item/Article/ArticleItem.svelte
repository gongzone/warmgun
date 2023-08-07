<script lang="ts">
	import type { Article } from '$lib/types/article';
	import Image from '$components/@ui/Image.svelte';
	import ImageIcon from '$components/@icons/editor/ImageIcon.svelte';
	import TextWithIcon from '$components/@ui/TextWithIcon.svelte';
	import { categories } from '$lib/constants/categories';
	import { formatCount, formatDate } from '$lib/utils/format';
	import HeartIcon from '$components/@icons/HeartIcon.svelte';
	import CommentIcon from '$components/@icons/CommentIcon.svelte';

	export let article: Article;

	$: articleSlug = `/@${article.user.username}/${article.slug}`;
</script>

<div class="py-6 border-b border-b-surface-600">
	<header class="flex items-center justify-between gap-6">
		<div>
			<a href={articleSlug}>
				<h3 class="line-clamp-2 text-xl font-medium">{article.title}</h3>
			</a>

			<a href={articleSlug}>
				<p class="line-clamp-3 font-extralight">{article.excerpt}</p>
			</a>
		</div>

		<div>
			<a href={articleSlug}>
				{#if article.coverImage}
					<div class="w-[200px] h-full rounded-2xl shadow-xl overflow-hidden">
						<Image
							loading="lazy"
							src={`${article.coverImage}?w=560&h=420&q=80&f=webp`}
							alt="cover"
							class="aspect-[560/420] transition-all duration-500 ease-in-out hover:saturate-150 hover:scale-105"
							width={560}
							height={420}
						/>
					</div>
				{:else}
					<div
						class="flex w-[200px] items-center justify-center aspect-[560/420] rounded-2xl shadow-xl bg-surface-700"
					>
						<ImageIcon class="w-20 h-20" />
					</div>
				{/if}
			</a>
		</div>
	</header>

	<footer class="flex items-center flex-wrap gap-2">
		<ul class="flex gap-2">
			<li>
				<a class="badge variant-filled-primary" href="/article/${categories[article.category].slug}"
					>{categories[article.category].title}</a
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

		<span class="opacity-75">·</span>

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

		<span class="opacity-75">·</span>

		<span class="text-sm font-extralight">{formatDate(article.createdAt)}</span>
	</footer>
</div>
