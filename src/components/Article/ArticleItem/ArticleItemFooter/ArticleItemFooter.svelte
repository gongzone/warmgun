<script lang="ts">
	import { formatDate } from '$lib/utils/format';

	import TextWithIcon from '$components/@ui/TextWithIcon.svelte';
	import HeartIcon from '$components/@icons/HeartIcon.svelte';
	import CommentIcon from '$components/@icons/CommentIcon.svelte';
	import { formatCount } from '$lib/utils/format';

	export let createdAt: Date;
	export let likeCount: number;
	export let commentCount: number;
</script>

<div class="flex items-center justify-between">
	<span class="badge variant-filled">{formatDate(createdAt)}</span>

	<div class="flex items-center gap-2">
		<TextWithIcon icon={HeartIcon} size="sm" gap={1} iconClass="text-red-500" textClass="font-thin"
			>{formatCount(likeCount)}</TextWithIcon
		>
		<TextWithIcon icon={CommentIcon} size="sm" gap={1} textClass="font-thin"
			>{formatCount(commentCount)}</TextWithIcon
		>
	</div>
</div>
