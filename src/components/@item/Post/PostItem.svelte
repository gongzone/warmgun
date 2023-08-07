<script lang="ts">
	import UserAvatar from '$components/@ui/UserAvatar.svelte';
	import TextWithIcon from '$components/@ui/TextWithIcon.svelte';

	import LikeIcon from '$components/@icons/LikeIcon.svelte';
	import CommentIcon from '$components/@icons/CommentIcon.svelte';

	import type { Post } from '$lib/types/post';
	import { formatDate } from '$lib/utils/format';
	import { communities } from '$lib/constants/communities';

	export let post: Post;
	export let displayUserInfo: boolean = true;
	export let displayCommunity: boolean = true;
	export let displayCount: boolean = true;

	$: ({ user, title, _count, createdAt } = post);
</script>

<div class="py-6 border-b border-b-surface-600 space-y-4">
	<div class="space-y-2">
		<div class="flex items-center gap-1">
			{#if displayUserInfo}
				<a href="/@{post.user.username}">
					<UserAvatar src={user.profile?.avatar} name={user.profile?.nickname} width="w-10" />
				</a>
				<span class="opacity-75">·</span>
			{/if}

			{#if displayCommunity}
				<a
					class="badge variant-filled-primary"
					href="/community/{communities[post.community].slug}"
				>
					{communities[post.community].title}
				</a>
				<span class="opacity-75">·</span>
			{/if}
			<span class="font-extralight">{formatDate(createdAt)}</span>
		</div>

		<a class="block" href="/community/post/{post.slug}">
			<h2 class="text-base font-medium max-w-[700px] line-clamp-1">
				{title}
			</h2>
		</a>
	</div>

	{#if displayCount}
		<div class="flex items-center gap-2">
			<TextWithIcon icon={LikeIcon}>{_count.likes}</TextWithIcon>
			<TextWithIcon icon={CommentIcon}>{_count.comments}</TextWithIcon>
		</div>
	{/if}
</div>
