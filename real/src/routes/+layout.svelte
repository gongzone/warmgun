<script lang="ts">
	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';

	import { browser } from '$app/environment';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	import Toast from '$components/@ui/Toast/Toast.svelte';
	import Drawer from '$components/@ui/Drawer/Drawer.svelte';
	import Modal from '$components/@ui/Modal/Modal.svelte';

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser,
				retry: false,
				refetchOnWindowFocus: false,
				refetchOnMount: true
			}
		}
	});

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<QueryClientProvider client={queryClient}>
	<Toast />
	<Drawer />
	<Modal />
	<slot />
</QueryClientProvider>
