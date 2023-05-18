<script lang="ts">
	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';

	import { browser } from '$app/environment';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	import Toast from '$lib/components/@ui/Toast/Toast.svelte';
	import Drawer from '$lib/components/@ui/Drawer/Drawer.svelte';
	import Modal from '$lib/components/@ui/Modal/Modal.svelte';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

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
</script>

<QueryClientProvider client={queryClient}>
	<Toast />
	<Drawer />
	<Modal />
	<slot />
</QueryClientProvider>
