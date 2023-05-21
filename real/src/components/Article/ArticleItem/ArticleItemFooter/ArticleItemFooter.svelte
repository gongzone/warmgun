<script lang="ts">
	import { formatDate } from '$lib/utils/format';

	import TextWithIcon from '$components/@ui/TextWithIcon.svelte';
	import HeartIcon from '$components/@icons/HeartIcon.svelte';
	import CommentIcon from '$components/@icons/CommentIcon.svelte';

	export let createdAt: Date;
	export let likeCount: number;
	export let commentCount: number;
</script>

<div class="flex items-center justify-between">
	<span class="text-sm font-thin">On {formatDate(createdAt)}</span>

	<div class="flex items-center gap-2">
		<TextWithIcon icon={HeartIcon} size="sm" gap={1} iconClass="text-red-500" textClass="font-thin"
			>{likeCount}</TextWithIcon
		>
		<TextWithIcon icon={CommentIcon} size="sm" gap={1} textClass="font-thin"
			>{commentCount}</TextWithIcon
		>
	</div>
</div>
