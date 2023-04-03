<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import HeartIcon from '~icons/ri/heart-2-fill';
	import CommentIcon from '~icons/ri/message-3-fill';

	export let username: string;
	export let nickname: string;
	export let avatar: string | null;
	export let likeCount: number;
	export let commentCount: number;
</script>

<footer class="flex justify-between items-center p-4 border-t border-t-surface-500">
	<div class="flex items-center gap-2">
		<a class="unstyled" href={`/@${username}`}>
			<Avatar src={avatar ?? ''} width="w-12" />
		</a>
		<a class="unstyled" href={`/@${username}`}>
			<span class="font-bold">{nickname}</span>
		</a>
	</div>

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
</footer>
