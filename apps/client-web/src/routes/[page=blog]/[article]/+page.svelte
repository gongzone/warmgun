<script lang="ts">
	import { page } from '$app/stores';
	import { createMutation, createQuery } from '@tanstack/svelte-query';

	import { getArticleBySlug } from '$api/article';
	import { Avatar } from '@skeletonlabs/skeleton';
	import Viewer from '$components/Editor/Viewer.svelte';
	import { toggleLike } from '$api/like';

	const toggleLikeMutation = createMutation({
		mutationFn: () => toggleLike(`/${$page.params.page}/${$page.params.article}`)
	});

	$: getArticleBySlugQuery = createQuery({
		queryKey: ['article', `${$page.params.page}/${$page.params.article}`],
		queryFn: () => getArticleBySlug(`${$page.params.page}/${$page.params.article}`)
	});
</script>

{#if $getArticleBySlugQuery.isSuccess}
	<main class="max-w-[760px] mx-auto py-12">
		<div class="flex justify-between mb-6">
			<div class="flex gap-2">
				<Avatar src={$getArticleBySlugQuery.data.author.avatar ?? ''} />
				<div class="flex flex-col gap-1">
					<span class="!font-serif">{$getArticleBySlugQuery.data.author.nickname}</span>
					<span class="!fotn-serif text-xs text-surface-400"
						>{$getArticleBySlugQuery.data.author.bio}</span
					>
				</div>
			</div>

			<div>
				<span>Likes: {$getArticleBySlugQuery.data.article.likeCount}</span>
				<span>Comments: {$getArticleBySlugQuery.data.article.commentCount}</span>
				<span>날짜: {$getArticleBySlugQuery.data.article.createdAt}</span>
			</div>
		</div>

		<div class="flex flex-col gap-6 mb-16">
			<div class="w-full h-[478px] overflow-hidden rounded-lg">
				<img
					class="w-full h-full object-cover"
					src={$getArticleBySlugQuery.data.article.coverImage}
					alt={$getArticleBySlugQuery.data.article.title}
				/>
			</div>

			<div class="space-y-4">
				<h2 class="unstyled text-center font-bold font-serif text-3xl">
					{$getArticleBySlugQuery.data.article.title}
				</h2>
				<p class="text-center text-surface-300 font-serif">
					{$getArticleBySlugQuery.data.article.subTitle}
				</p>
			</div>
		</div>

		<div>
			<Viewer body={$getArticleBySlugQuery.data.article.body} />
		</div>
	</main>
{/if}
