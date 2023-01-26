<script lang="ts">
	import type { LayoutData } from './$types';
	import { Drawer } from '@skeletonlabs/skeleton';

	import DraftSidebar from './_DraftSidebar/DraftSidebar.svelte';

	export let data: LayoutData;

	$: writer = data.writer;
</script>

<Drawer width="w-full sm:w-[495px]" duration={200}>
	<DraftSidebar {writer} />
</Drawer>

<slot />
