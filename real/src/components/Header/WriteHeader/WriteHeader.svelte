<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { AppBar } from '@skeletonlabs/skeleton';

	import type { CurrentEditorData } from '$lib/types/editor';
	import { openDraftSidebar, openPublishSidebar } from '$components/@ui/Drawer/drawer';
	import ArrowLeftIcon from '$components/@icons/ArrowLeftIcon.svelte';
	import DraftIcon from '$components/@icons/DraftIcon.svelte';

	export let getCurrentEditorData: () => Promise<CurrentEditorData>;
</script>

<AppBar padding="px-2 py-4 sm:px-6" background="bg-transparent" slotLead="space-x-2">
	<svelte:fragment slot="lead">
		<button type="button" class="btn-icon" on:click={() => goto('/')}>
			<ArrowLeftIcon class="w-6 h-6" />
		</button>
		<button
			type="button"
			class="btn-icon btn-icon-lg variant-ghost-surface"
			on:click={() => openDraftSidebar()}
		>
			<DraftIcon class="w-6 h-6" />
		</button>
	</svelte:fragment>

	<svelte:fragment slot="trail">
		<form
			method="POST"
			action="?/saveDraft"
			use:enhance={async ({ data }) => {
				const { title, body } = await getCurrentEditorData();
				console.log(body);
				data.append('title', title);
				data.append('body', JSON.stringify(body));

				return async ({ update }) => {
					update();
				};
			}}
		>
			<button type="submit" class="btn variant-filled-secondary">저장</button>
		</form>
		<button
			type="button"
			class="btn variant-filled-primary"
			on:click={async () => openPublishSidebar({ meta: await getCurrentEditorData() })}
			>글 등록</button
		>
	</svelte:fragment>
</AppBar>
