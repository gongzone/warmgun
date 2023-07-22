<script lang="ts">
	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';

	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	import Toast from '$components/@ui/Toast/Toast.svelte';
	import Drawer from '$components/@ui/Drawer/Drawer.svelte';
	import Modal from '$components/@ui/Modal/Modal.svelte';
	import Layout from '$components/Layout/Layout.svelte';

	export let data: LayoutData;

	let layoutMode: 'default' | 'write' = 'default';

	$: pathname = $page.url.pathname;
	$: layoutMode = pathname.startsWith('/write') ? 'write' : 'default';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<QueryClientProvider client={data.queryClient}>
	<Toast />
	<Drawer />
	<Modal />
	<Layout mode={layoutMode}>
		<slot />
	</Layout>
</QueryClientProvider>
