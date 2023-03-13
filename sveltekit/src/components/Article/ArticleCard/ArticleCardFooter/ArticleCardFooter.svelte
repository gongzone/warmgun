<script lang="ts">
	import { formatCount } from '$lib/utils/format';

	import UserAvatar from '$components/User/UserAvatar.svelte';

	export let writerAvatar: string | null | undefined;
	export let writerName: string;
	export let likesCount: number;
	export let commentsCount: number;
</script>

<footer class="flex justify-between items-center p-4 border-t border-t-surface-500">
	<div class="flex items-center gap-4">
		<UserAvatar src={writerAvatar} width="w-12" />
		<span class="font-bold">{writerName}</span>
	</div>

	<div class="flex items-center gap-4">
		<div class="flex items-center gap-2">
			<i class="ri-heart-2-fill ri-lg text-secondary-500" />
			<span class="text-sm font-thin tracking-wide">${formatCount(likesCount)}</span>
		</div>

		<div class="flex items-center gap-2">
			<i class="ri-message-3-fill ri-lg" />
			<span class="text-sm font-thin">${formatCount(commentsCount)}</span>
		</div>
	</div>
</footer>
