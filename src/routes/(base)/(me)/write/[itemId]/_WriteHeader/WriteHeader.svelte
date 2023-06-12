<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { AppBar } from '@skeletonlabs/skeleton';

	import type { ArticleMeta, CurrentEditorData } from '$lib/types/editor';
	import { openDraftSidebar, openPublishSidebar } from '$components/@ui/Drawer/drawer';
	import ArrowLeftIcon from '$components/@icons/ArrowLeftIcon.svelte';
	import DraftIcon from '$components/@icons/DraftIcon.svelte';

	export let mode: 'draft' | 'edit' = 'draft';
	export let articleMeta: ArticleMeta | undefined = undefined;
	export let getCurrentEditorData: () => Promise<CurrentEditorData>;
</script>

<AppBar padding="px-2 py-4 sm:px-6" background="bg-transparent" slotLead="space-x-2">
	<svelte:fragment slot="lead">
		<button
			type="button"
			class="btn-icon"
			on:click={() => goto(`${mode === 'draft' ? '/' : `/@${$page.data.user?.username}`}`)}
		>
			<ArrowLeftIcon class="w-6 h-6" />
		</button>
		{#if mode === 'draft'}
			<button
				type="button"
				class="btn-icon btn-icon-lg variant-ghost-surface"
				on:click={() => openDraftSidebar()}
			>
				<DraftIcon class="w-6 h-6" />
			</button>
		{/if}
	</svelte:fragment>

	<svelte:fragment slot="trail">
		{#if mode === 'draft'}
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
		{/if}
		<button
			type="button"
			class="btn variant-filled-primary"
			on:click={async () =>
				openPublishSidebar({ meta: { mode, articleMeta, ...(await getCurrentEditorData()) } })}
		>
			{#if mode === 'draft'}
				글 등록
			{:else}
				글 수정
			{/if}
		</button>
	</svelte:fragment>
</AppBar>
