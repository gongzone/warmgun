<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance, applyAction } from '$app/forms';
	import { drawerStore } from '@skeletonlabs/skeleton';

	import WriterDisplay from './WriterDisplay/WriterDisplay.svelte';
	import DraftAccordion from './DraftAccordion/DraftAccordion.svelte';

	function closeWriterSidebar() {
		drawerStore.close();
	}

	const submitHandler: SubmitFunction = async ({ form, data, action, cancel }) => {
		return async ({ result }) => {
			closeWriterSidebar();
			await applyAction(result);
		};
	};
</script>

<div class="flex justify-end p-5">
	<button class="btn-icon btn-ringed-tertiary" on:click={closeWriterSidebar}>
		<i class="ri-close-line ri-xl" />
	</button>
</div>

<div class="px-2">
	<WriterDisplay />
</div>

<div class="py-8 px-2">
	<DraftAccordion />
</div>

<div class="px-6">
	<form method="POST" action="/write/draft?/create" use:enhance={submitHandler}>
		<button class="btn variant-filled-primary w-full">새 초고 만들기</button>
	</form>
</div>

<div class="h-10" />
