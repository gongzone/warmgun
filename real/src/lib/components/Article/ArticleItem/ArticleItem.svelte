<script lang="ts">
	import type { Article } from '$lib/types/article';

	import { formatDate } from '$lib/utils/format';
	import UserAvatar from '$lib/components/@ui/UserAvatar.svelte';
	import HeartIcon from '$lib/components/@icons/HeartIcon.svelte';
	import CommentIcon from '$lib/components/@icons/CommentIcon.svelte';

	export let article: Article;
</script>

<div class="flex flex-col gap-4">
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-2">
			<UserAvatar src={article.author.profile?.avatar} width="w-12" />
			<div class="flex flex-col">
				<span>{article.author.profile?.nickname}</span>
				<span class="text-muted-foreground font-extralight">
					{article.author.profile?.field}
				</span>
			</div>
		</div>
	</div>

	<a href={article.slug}>
		<img
			src={article.coverImage ? `${article.coverImage}?w=560&h=420&q=80&f=webp` : ''}
			alt="cover"
			class="aspect-[560/420] rounded-2xl shadow-xl"
		/>
	</a>
	<div class="flex flex-col gap-1">
		<a href={article.slug}>
			<h3 class="line-clamp-2 text-xl">{article.title}</h3>
		</a>
		<a href={article.slug}>
			<p class="line-clamp-3 font-thin">{article.excerpt}</p>
		</a>
	</div>

	<ul class="flex list-none flex-wrap gap-2">
		{#each article.tags as tag (tag.id)}
			<li>
				<a href={`/tags/${tag.name}`}>
					{tag.name}
				</a>
			</li>
		{/each}
	</ul>

	<div class="flex items-center justify-between">
		<div class="space-x-2">
			<span class="text-sm font-thin">On {formatDate(article.createdAt)}</span>
		</div>
		<div class="flex gap-2">
			<div class="flex items-center gap-1">
				<HeartIcon class="h-5 w-5 text-red-500" />
				<span class="text-sm font-thin">{article._count.likes}</span>
			</div>
			<div>
				<div class="flex items-center gap-1">
					<CommentIcon class="h-5 w-5" />
					<span class="text-sm font-thin">{article._count.comments}</span>
				</div>
			</div>
		</div>
	</div>
</div>
