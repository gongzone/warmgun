<script lang="ts">
	// import '../theme.postcss';
	// import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';

	import type { LayoutData } from './$types';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	import Toast from '$components/@ui/Toast/Toast.svelte';
	import Drawer from '$components/@ui/Drawer/Drawer.svelte';
	import Modal from '$components/@ui/Modal/Modal.svelte';

	export let data: LayoutData;

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<QueryClientProvider client={data.queryClient}>
	<Toast />
	<Drawer />
	<Modal />
	<slot />
</QueryClientProvider>
