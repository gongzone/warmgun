<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import HeartIcon from '~icons/ri/heart-2-fill';
	import CommentIcon from '~icons/ri/message-3-fill';

	export let writerAvatar: string | null;
	export let writerName: string;
	export let username: string;
	export let likesCount: number;
	export let commentsCount: number;
</script>

<footer class="flex justify-between items-center p-4 border-t border-t-surface-500">
	<div class="flex items-center gap-2">
		<a class="unstyled" href={`/@${username}`}>
			<Avatar src={writerAvatar ?? ''} width="w-12" />
		</a>
		<a class="unstyled" href={`/@${username}`}>
			<span class="font-bold">{writerName}</span>
		</a>
	</div>

	<div class="flex items-center gap-4">
		<div class="flex items-center gap-1">
			<span><HeartIcon class="text-secondary-500" /></span>
			<span class="text-sm font-thin tracking-wide">{likesCount}</span>
		</div>

		<div class="flex items-center gap-1">
			<span><CommentIcon /></span>
			<span class="text-sm font-thin">{commentsCount}</span>
		</div>
	</div>
</footer>
