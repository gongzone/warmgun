<script lang="ts">
	import { page } from '$app/stores';
	import { createMutation, createQuery } from '@tanstack/svelte-query';
	import HeartIcon from '~icons/ri/heart-2-fill';

	import { findOneArticle, likeArticle, unlikeArticle } from '$api/article';
	import { Avatar } from '@skeletonlabs/skeleton';
	import Viewer from '$components/Editor/Viewer.svelte';
	import BottomBar from '$components/@ui/Block/BottomBar/BottomBar.svelte';
	import BottomBarItem from '$components/@ui/Block/BottomBar/BottomBarItem.svelte';
	import Comment from '$components/Comment/Comment.svelte';

	let isLiked: boolean | undefined = false;

	$: blogerArticleQuery = createQuery({
		queryKey: ['articles', $page.params.page.slice(1), $page.params.article],
		queryFn: () => findOneArticle($page.params.page.slice(1), $page.params.article),
		onSuccess: (data) => {
			isLiked = data.isLiked;
		}
	});

	const likeArticleMutation = createMutation({
		mutationFn: () => likeArticle($blogerArticleQuery.data!.id),
		onSuccess: () => {
			isLiked = true;
		}
	});

	const unlikeArticleMutation = createMutation({
		mutationFn: () => unlikeArticle($blogerArticleQuery.data!.id),
		onSuccess: () => {
			isLiked = false;
		}
	});
</script>

{#if $blogerArticleQuery.isSuccess}
	<main class="max-w-[760px] mx-auto py-12">
		<div class="flex justify-between mb-6">
			<div class="flex gap-2">
				<Avatar src={$blogerArticleQuery.data.author.profile.avatar ?? ''} />
				<div class="flex flex-col gap-1">
					<span class="!font-serif">{$blogerArticleQuery.data.author.profile.nickname}</span>
					<span class="!fotn-serif text-xs text-surface-400"
						>{$blogerArticleQuery.data.author.profile.bio}</span
					>
				</div>
			</div>

			<div>
				<span>Likes: {$blogerArticleQuery.data._count.likes}</span>
				<span>Comments: {$blogerArticleQuery.data._count.comments}</span>
				<span>날짜: {$blogerArticleQuery.data.createdAt}</span>
			</div>
		</div>

		<div class="flex flex-col gap-6 mb-16">
			<div class="w-full h-[478px] overflow-hidden rounded-lg">
				<img
					class="w-full h-full object-cover"
					src={$blogerArticleQuery.data.coverImage}
					alt={$blogerArticleQuery.data.title}
				/>
			</div>

			<div class="space-y-4">
				<h2 class="unstyled text-center font-bold font-serif text-3xl">
					{$blogerArticleQuery.data.title}
				</h2>
				<p class="text-center text-surface-300 font-serif">
					{$blogerArticleQuery.data.subTitle}
				</p>
			</div>
		</div>

		<div class="viewer-container">
			<Viewer body={$blogerArticleQuery.data.body} />
		</div>

		<div class="mt-32 space-y-6">
			<span class="font-bold text-2xl">{$blogerArticleQuery.data._count.comments}개의 댓글</span>
			<Comment articleId={$blogerArticleQuery.data.id} />
		</div>
	</main>

	<BottomBar position="fixed" innerDiv="grid-cols-2">
		{#if isLiked}
			<BottomBarItem
				btnName="delete"
				appBtnPosition="left"
				on:click={() => $unlikeArticleMutation.mutate()}
			>
				<HeartIcon class="text-primary-500" />
			</BottomBarItem>
		{:else}
			<BottomBarItem
				btnName="Home"
				appBtnPosition="left"
				on:click={() => $likeArticleMutation.mutate()}
			>
				<HeartIcon />
			</BottomBarItem>
		{/if}
	</BottomBar>
{/if}
