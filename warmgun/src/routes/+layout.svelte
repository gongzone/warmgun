<script lang="ts">
	import '../styles/theme.postcss';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../styles/font.postcss';
	import '../styles/global.postcss';

	import { storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';

	import Toast from '$components/@ui-singletons/Toast/Toast.svelte';

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<Toast />

<slot />
