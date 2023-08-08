<script lang="ts">
	import { formatDate } from '$lib/utils/format';

	import TextWithIcon from '$components/@ui/TextWithIcon.svelte';
	import HeartIcon from '$components/@icons/HeartIcon.svelte';
	import CommentIcon from '$components/@icons/CommentIcon.svelte';
	import { formatCount } from '$lib/utils/format';
	import Badge from '$components/@ui/Test/Badge.svelte';
	import UserAvatar from '$components/@ui/UserAvatar.svelte';

	export let createdAt: Date;
	export let likeCount: number;
	export let commentCount: number;
	export let username: string;
	export let nickname: string | undefined;
	export let field: string | undefined;
	export let avatar: string | null | undefined;
</script>

<div class="flex items-center justify-between">
	<div class="flex items-center gap-2">
		<Badge>{formatDate(createdAt)}</Badge>
	</div>

	<div class="flex items-center gap-2">
		<TextWithIcon icon={HeartIcon} size="sm" gap={1} iconClass="text-red-500" textClass="font-thin"
			>{formatCount(likeCount)}</TextWithIcon
		>
		<TextWithIcon icon={CommentIcon} size="sm" gap={1} textClass="font-thin"
			>{formatCount(commentCount)}</TextWithIcon
		>
	</div>
</div>
