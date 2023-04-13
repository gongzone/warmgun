<script lang="ts">
	import '@fontsource/noto-sans-kr/400.css';
	import '@fontsource/noto-sans-kr/100.css';
	import '@fontsource/noto-serif-kr/400.css';
	import '@fontsource/concert-one/400.css';

	import '../styles/themes/theme-default.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../styles/global.postcss';

	import type { LayoutData } from './$types';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { storePopup, Toast } from '@skeletonlabs/skeleton';
	import Modal from '$components/Modal/Modal.svelte';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';

	import Drawer from '$components/Drawer/Drawer.svelte';

	export let data: LayoutData;

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<QueryClientProvider client={data.queryClient}>
	<Toast />
	<Modal />
	<Drawer />
	<slot />
</QueryClientProvider>
