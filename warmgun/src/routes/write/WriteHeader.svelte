<script lang="ts">
	import { goto } from '$app/navigation';
	import { AppBar } from '@skeletonlabs/skeleton';
	import BackIcon from '~icons/ri/arrow-left-line';
	import DraftIcon from '~icons/ri/article-line';
</script>

<AppBar padding="px-2 py-4 sm:px-4" background="bg-transparent">
	<svelte:fragment slot="lead">
		<button type="button" class="btn-icon" on:click={() => goto('/')}>
			<BackIcon class="w-6 h-6" />
		</button>
		<button type="button" class="btn-icon btn-icon-lg variant-ghost-surface">
			<DraftIcon class="w-6 h-6" />
		</button>
	</svelte:fragment>

	<svelte:fragment slot="trail">
		<button type="button" class="btn variant-filled-secondary">저장</button>
		<button type="button" class="btn variant-filled-primary">글 등록</button>
	</svelte:fragment>
</AppBar>
