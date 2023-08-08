<script lang="ts">
	import UserAvatar from '$components/@ui/UserAvatar.svelte';
	import TextWithIcon from '$components/@ui/TextWithIcon.svelte';

	import LikeIcon from '$components/@icons/LikeIcon.svelte';
	import CommentIcon from '$components/@icons/CommentIcon.svelte';

	import type { Post } from '$lib/types/post';
	import { formatDate } from '$lib/utils/format';

	export let post: Post;

	$: ({ user, title, _count, createdAt } = post);
</script>

<div class="py-6 border-b border-b-surface-600 space-y-4">
	<div class="space-y-2">
		<div class="flex items-center gap-1">
			<UserAvatar src={user.profile?.avatar} name={user.profile?.nickname} width="w-10" />
			<span>·</span>
			<span class="font-extralight">{formatDate(createdAt)}</span>
		</div>

		<h2 class="text-base font-medium max-w-[700px] line-clamp-1">
			{title}
		</h2>
	</div>

	<div class="flex items-center gap-2">
		<TextWithIcon icon={LikeIcon}>{_count.likes}</TextWithIcon>
		<TextWithIcon icon={CommentIcon}>{_count.comments}</TextWithIcon>
	</div>
</div>
