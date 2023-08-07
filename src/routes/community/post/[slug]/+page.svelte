<script lang="ts">
	import type { PageData } from './$types';

	import Seo from '$components/@utils/Seo.svelte';
	import Editor from '$components/@editor/Editor.svelte';
	import TextWithIcon from '$components/@ui/TextWithIcon.svelte';
	import CommunityIcon from '$components/@icons/common/CommunityIcon.svelte';
	import ArrowRightSmall from '$components/@icons/ArrowRightSmall.svelte';
	import { communities } from '$lib/constants/communities';
	import Separator from '$components/@ui/Separator.svelte';
	import UserAvatar from '$components/@ui/UserAvatar.svelte';
	import CalendarIcon from '$components/@icons/CalendarIcon.svelte';
	import { formatDate } from '$lib/utils/format';
	import { openCommentSidebar } from '$components/@ui/Drawer/drawer';
	import CommentIcon from '$components/@icons/CommentIcon.svelte';
	import HeartIcon from '$components/@icons/HeartIcon.svelte';
	import { enhance } from '$app/forms';
	import PostControlPopup from '$components/@ui/Popup/PostControlPopup.svelte';

	export let data: PageData;

	$: ({ post, isLiked, isOwner } = data);

	$: likesAction = isLiked ? '?/unlike' : '?/like';
</script>

<div class="container">
	<main class="max-w-prose mx-auto py-12">
		<div class="flex items-center justify-between gap-2">
			<div class="flex items-center gap-1">
				<a href="/community">
					<TextWithIcon size="lg" icon={CommunityIcon}>커뮤니티</TextWithIcon>
				</a>
				<span><ArrowRightSmall class="w-5 h-5" /></span>
				<a href="/community/{communities[post.community].slug}">
					<span class="font-medium">{communities[post.community].title}</span>
				</a>
			</div>

			{#if isOwner}
				<PostControlPopup postId={post.id} />
			{/if}
		</div>

		<Separator class="my-3" width="sm" />

		<div class="flex items-center gap-2">
			<a href="/@{post.user.username}">
				<UserAvatar
					src={post.user.profile?.avatar}
					name={post.user.profile?.nickname}
					nameClasses="font-semibold text-lg"
				/>
			</a>

			<span class="opacity-70 font-thin">|</span>

			<TextWithIcon icon={CalendarIcon} textClasses="!text-sm"
				>{formatDate(post.createdAt)}</TextWithIcon
			>
		</div>

		<div class="mt-8 space-y-8">
			<h3 class="text-3xl font-semibold">{post.title}</h3>
			<Editor editable={false} body={post.body} />
		</div>

		<div class="flex justify-end my-12">
			<div class="flex justify-center items-center gap-4">
				<form method="POST" action={likesAction} class="flex items-center" use:enhance>
					<input type="hidden" name="postId" value={post.id} />
					<button type="submit" class="btn variant-filled-primary">
						<TextWithIcon
							icon={HeartIcon}
							iconClasses={isLiked ? 'text-red-600' : ''}
							size="md"
							textClasses="!text-sm"
							gap={1}>{post._count.likes}</TextWithIcon
						>
					</button>
				</form>
				<button
					type="button"
					class="btn variant-filled"
					on:click={() =>
						openCommentSidebar({
							meta: { mode: 'post', id: post.id, totalCount: post._count.comments }
						})}
				>
					<TextWithIcon icon={CommentIcon} textClasses="!text-sm" size="md" gap={1}
						>댓글 {post._count.comments}</TextWithIcon
					>
				</button>
			</div>
		</div>
	</main>
</div>
