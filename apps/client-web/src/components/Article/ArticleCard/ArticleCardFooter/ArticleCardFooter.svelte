<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';

	export let writerAvatar: string;
	export let writerName: string;
	export let likesCount: number;
	export let commentsCount: number;
</script>

<footer class="flex justify-between items-center p-4 border-t border-t-surface-500">
	<div class="flex items-center gap-4">
		<Avatar src={writerAvatar} width="w-12" />
		<span class="font-bold">{writerName}</span>
	</div>

	<div class="flex items-center gap-4">
		<div class="flex items-center gap-2">
			<i class="ri-heart-2-fill ri-lg text-secondary-500" />
			<span class="text-sm font-thin tracking-wide">${likesCount}</span>
		</div>

		<div class="flex items-center gap-2">
			<i class="ri-message-3-fill ri-lg" />
			<span class="text-sm font-thin">${commentsCount}</span>
		</div>
	</div>
</footer>
