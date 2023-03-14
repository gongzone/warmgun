<script lang="ts">
	import '@fontsource/noto-sans-kr/400.css';
	import '@fontsource/noto-sans-kr/100.css';
	import '@fontsource/noto-serif-kr/400.css';
	import '@fontsource/concert-one/400.css';

	import '../styles/themes/theme-default.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../styles/global.postcss';

	import { storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<slot />
