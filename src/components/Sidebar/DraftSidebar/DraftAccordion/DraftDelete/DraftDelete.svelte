<script lang="ts">
	export let draftId: number;
	export let currentDraftId: number;
</script>

<input type="hidden" name="currentDraftId" value={currentDraftId} hidden />
<input type="hidden" name="draftId" value={draftId} hidden />

<button formaction="?/delete" class="btn-icon w-9 h-9 px-0 variant-ringed-tertiary rounded-lg"
	><i class="ri-delete-bin-line ri-lg" /></button
>
