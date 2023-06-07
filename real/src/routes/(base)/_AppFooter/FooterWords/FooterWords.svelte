<script lang="ts">
	import { metaDefaults } from '$lib/configs/meta';

	export let title: string = metaDefaults.title;
	export let description: string = metaDefaults.description;
</script>

<div class="space-y-2">
	<h2 class="font-bold text-2xl">{title}</h2>
	<h3 class="text-primary-500 font-bold">{description}</h3>
</div>
