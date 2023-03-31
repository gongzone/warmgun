<script lang="ts">
	import UserAvatar from '$components/@Base/Avatar/UserAvatar.svelte';
	import { formatDate } from '$lib/utils/format';

	import HeartIcon from '~icons/ri/heart-2-fill';
	import CommentIcon from '~icons/ri/message-3-fill';

	export let likeCount: number;
	export let commentCount: number;

	export let username: string;
	export let nickname: string;
	export let avatar: string | null;
	export let createdAt: Date;
</script>

<header class="flex items-center">
	<div class="flex items-center gap-2">
		<a class="unstyled" href={`/@${username}`}>
			<UserAvatar {avatar} />
		</a>
		<div class="flex flex-col">
			<a class="unstyled" href={`/@${username}`}>
				<span class="font-bold">{nickname}</span>
			</a>
			<span class="text-sm font-thin">On {formatDate(createdAt)}</span>
		</div>
	</div>

	<hr class="divider-vertical h-10 mx-6" />

	<div class="flex items-center gap-4">
		<div class="flex items-center gap-1">
			<span><HeartIcon class="text-secondary-500" /></span>
			<span class="text-sm font-thin tracking-wide">{likeCount}</span>
		</div>

		<div class="flex items-center gap-1">
			<span><CommentIcon /></span>
			<span class="text-sm font-thin">{commentCount}</span>
		</div>
	</div>
</header>
