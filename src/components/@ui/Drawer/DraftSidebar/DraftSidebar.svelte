<script lang="ts">
	import { enhance } from '$app/forms';
	import { drawerStore } from '@skeletonlabs/skeleton';

	import CloseIcon from '$components/@icons/CloseIcon.svelte';
	import UserDisplay from './UserDisplay/UserDisplay.svelte';
	import DraftAccordion from './DraftAccordion/DraftAccordion.svelte';
</script>

<header class="flex justify-end p-5">
	<button type="button" class="btn-icon btn-ringed-tertiary" on:click={() => drawerStore.close()}>
		<CloseIcon class="w-6 h-6" />
	</button>
</header>

<div class="px-5 pb-8 space-y-8">
	<UserDisplay />
	<div class="space-y-8">
		<DraftAccordion />
		<form
			method="POST"
			action="?/createDraft"
			class="px-4"
			use:enhance={() => {
				return async ({ result, update }) => {
					if (!(result.type === 'failure')) drawerStore.close();
					update();
				};
			}}
		>
			<button type="submit" class="btn variant-filled-primary w-full">새 초고 만들기</button>
		</form>
	</div>
</div>
