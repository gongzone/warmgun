<script lang="ts">
	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';

	import { storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	import Toast from '$lib/components/@ui/Toast/Toast.svelte';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<Toast />

<slot />
