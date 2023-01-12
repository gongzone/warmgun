<script lang="ts">
	import type { LayoutData } from './$types';
	import { AppBar } from '@skeletonlabs/skeleton';

	export let data: LayoutData;
</script>

<AppBar padding="px-[5vw] py-1">
	<svelte:fragment slot="lead">
		<div class="flex flex-col gap-1 " />
	</svelte:fragment>
</AppBar>

<div class="p-5">
	<h2>dnjsqhwo의 블로그</h2>
</div>
<slot />
