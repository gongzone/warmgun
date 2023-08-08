<script lang="ts">
	import Badge from '$components/@ui/Test/Badge.svelte';
	import TextWithIcon from '$components/@ui/TextWithIcon.svelte';
	import UserAvatar from '$components/@ui/UserAvatar.svelte';
	import { formatDate } from '$lib/utils/format';
	import HeartIcon from '$components/@icons/HeartIcon.svelte';
	import CommentIcon from '$components/@icons/CommentIcon.svelte';
	import { formatCount } from '$lib/utils/format';

	export let username: string;
	export let nickname: string | undefined;
	export let field: string | undefined;
	export let avatar: string | null | undefined;
	export let createdAt: Date;
	export let likeCount: number;
	export let commentCount: number;
</script>

<header class="flex items-center justify-between">
	<div class="flex items-center gap-2">
		<a href={`/@${username}`} class="flex items-center gap-2">
			<UserAvatar src={avatar} width="w-6" />
			<div class="flex flex-col">
				<span class="text-sm">{nickname}</span>
			</div>
		</a>
		<span class="opacity-75">·</span>
		<span class="text-sm font-thin">{formatDate(createdAt)}</span>
	</div>
</header>
