<script lang="ts">
	import HeartIcon from '~icons/ri/heart-2-fill';
	import CommentIcon from '~icons/ri/message-3-fill';

	import { formatDate } from '$lib/utils/format';
	import UserPiece from '$components/@ui/Block/UserPiece.svelte';
	import UserAvatar from '$components/@ui/Block/UserAvatar.svelte';
	import CountWithIcon from '$components/@ui/Block/CountWithIcon.svelte';

	export let username: string;
	export let nickname: string;
	export let avatar: string | null;
	export let createdAt: Date;
	export let likesCount: number;
	export let commentsCount: number;
</script>

<header class="flex items-center">
	<UserPiece {username} {nickname} {avatar} subText={`On ${formatDate(createdAt)}`} />

	<hr class="divider-vertical h-10 mx-6" />

	<div class="flex items-center gap-4">
		<CountWithIcon icon={HeartIcon} iconClass="text-secondary-500" count={likesCount} />
		<CountWithIcon icon={CommentIcon} count={commentsCount} />
	</div>
</header>
