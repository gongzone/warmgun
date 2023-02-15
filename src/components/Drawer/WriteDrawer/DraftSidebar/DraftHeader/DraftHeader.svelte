<script lang="ts">
	import { drawerStore } from '@skeletonlabs/skeleton';
</script>

<header class="flex justify-end p-5">
	<button type="button" class="btn-icon btn-ringed-tertiary" on:click={() => drawerStore.close()}>
		<i class="ri-close-line ri-xl" />
	</button>
</header>
