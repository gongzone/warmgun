<script lang="ts">
	import { drawerStore } from '@skeletonlabs/skeleton';

	import CloseIcon from '$components/@icons/CloseIcon.svelte';

	export let totalCount: number;
</script>

<header class="flex justify-between items-center">
	<span class="text-lg font-bold">댓글 ({totalCount})</span>
	<button type="button" on:click={() => drawerStore.close()}><CloseIcon /></button>
</header>
