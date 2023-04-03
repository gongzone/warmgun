<script lang="ts">
	import AwardIcon from '~icons/ri/award-line';

	export let text: string;
</script>

<div class="flex items-center gap-2 mb-3">
	<span><AwardIcon class="text-surface-300" /></span>
	<span class="text-surface-300">{text}</span>
</div>
