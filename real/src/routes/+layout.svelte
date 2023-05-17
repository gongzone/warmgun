<script lang="ts">
	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';

	import { storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	import Toast from '$lib/components/@ui/Toast/Toast.svelte';
	import Drawer from '$lib/components/@ui/Drawer/Drawer.svelte';
	import Modal from '$lib/components/@ui/Modal/Modal.svelte';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<Toast />
<Drawer />
<Modal />

<slot />
