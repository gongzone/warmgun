<script lang="ts">
	import ContrastIcon from '$components/@icons/ContrastIcon.svelte';

	export let text: string;
</script>

<div class="flex items-center gap-2 mb-3">
	<ContrastIcon class="text-surface-300 w-5 h-5" />
	<span class="text-surface-300">{text}</span>
</div>
