<script lang="ts">
	import Button from '$components/@ui/Test/Button.svelte';

	export let name: string;
	export let slug: string;
</script>

<Button variant="outline" size="sm" class="text-xs h-8 px-3">
	{name}
</Button>
