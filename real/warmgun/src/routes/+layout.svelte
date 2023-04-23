<script lang="ts">
	import '../styles/theme.postcss';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../styles/font.postcss';
	import '../styles/global.postcss';

	import { storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';

	import Modal from '$components/Singleton/Modal/Modal.svelte';

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<Modal />

<slot />
