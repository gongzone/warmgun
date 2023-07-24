<script lang="ts">
	import AutosizeTextarea from '$components/@ui/AutosizeTextarea.svelte';

	let title: string = '';
</script>

<AutosizeTextarea name="title" placeholder="제목을 입력하세요" bind:value={title} size="xl" />
