<script lang="ts">
	import type { LayoutData } from './$types';

	import WriteDrawer from '$components/Drawer/WriteDrawer/WriteDrawer.svelte';

	export let data: LayoutData;
</script>

<WriteDrawer writer={data.writer} />

<slot />
