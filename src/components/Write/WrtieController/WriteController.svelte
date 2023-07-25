<script lang="ts">
	import ArrowLeftIcon from '$components/@icons/ArrowLeftIcon.svelte';
	import DraftIcon from '$components/@icons/DraftIcon.svelte';
</script>

<header class="flex items-center justify-between px-2 py-4 sm:px-6 bg-surface-50-900-token">
	<div class="flex items-center gap-2">
		<button type="button" class="btn-icon">
			<ArrowLeftIcon class="w-6 h-6" />
		</button>
		<button type="button" class="btn-icon btn-icon-lg variant-ghost-surface">
			<DraftIcon />
		</button>
	</div>

	<div class="flex items-center gap-2">
		<button type="button" class="btn variant-filled-secondary">저장</button>
		<button type="button" class="btn variant-filled-primary">글 등록</button>
	</div>
</header>
