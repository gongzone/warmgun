<script lang="ts">
	import { drawerStore } from '@skeletonlabs/skeleton';

	import Gun from '$components/@svg/Gun.svelte';
</script>

<header class="flex justify-between items-center border-b border-b-surface-500 px-3 py-3">
	<a href="/" class="unstyled" on:click={() => drawerStore.close()}>
		<div class="flex items-center gap-1">
			<Gun />
			<h2 class="unstyled font-logo text-lg">Warmgun</h2>
		</div>
	</a>
	<div>
		<button class="btn-icon" on:click={() => drawerStore.close()}>
			<i class="ri-close-line ri-xl" />
		</button>
	</div>
</header>
