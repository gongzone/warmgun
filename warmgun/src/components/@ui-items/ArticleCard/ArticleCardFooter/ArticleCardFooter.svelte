<script lang="ts">
	import HeartIcon from '~icons/ri/heart-2-fill';
	import CommentIcon from '~icons/ri/message-3-fill';

	import UserPiece from '$components/@ui-elements/UserPiece.svelte';
	import IconWithCount from '$components/@ui-elements/IconWithCount.svelte';

	export let username: string;
	export let nickname: string;
	export let avatar: string | null;
	export let likesCount: number;
	export let commentsCount: number;
</script>

<footer class="flex justify-between items-center p-4 border-t border-t-surface-500">
	<UserPiece {username} {nickname} {avatar} />

	<div class="flex items-center gap-4">
		<IconWithCount icon={HeartIcon} iconClass="text-secondary-500" count={likesCount} />
		<IconWithCount icon={CommentIcon} count={commentsCount} />
	</div>
</footer>
