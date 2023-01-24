<script lang="ts">
	import { drawerClose } from '$components/Drawer/Drawer';
	import WriterDisplay from './WriterDisplay/WriterDisplay.svelte';
	import DraftAccordion from './DraftAccordion/DraftAccordion.svelte';
</script>

<div class="flex justify-end p-5">
	<button class="btn-icon btn-ringed-tertiary" on:click={drawerClose}>
		<i class="ri-close-line ri-xl" />
	</button>
</div>

<div class="px-8">
	<WriterDisplay />
</div>

<div class="py-8 px-2">
	<DraftAccordion />
</div>
