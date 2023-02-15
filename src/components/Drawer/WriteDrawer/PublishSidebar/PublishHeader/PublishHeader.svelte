<script lang="ts">
	import { drawerStore } from '@skeletonlabs/skeleton';
</script>

<div class="flex justify-between px-3 sm:px-5 py-4">
	<button type="button" class="btn btn-ringed-tertiary" on:click={() => drawerStore.close()}>
		<i class="ri-close-line ri-xl" /> 닫기
	</button>

	<button
		type="submit"
		formaction="?/publish"
		class="btn variant-filled-primary"
		on:click={() => drawerStore.close()}
	>
		출간하기
	</button>
</div>
<hr />
