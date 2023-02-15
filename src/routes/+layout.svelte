<script>
	import '@fontsource/noto-sans-kr/400.css';
	import '@fontsource/noto-serif-kr/400.css';
	import '@fontsource/concert-one';
	import 'remixicon/fonts/remixicon.css';

	import '../styles/themes/theme-default.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../styles/global.postcss';
	import '../styles/editor.postcss';

	import { Toast } from '@skeletonlabs/skeleton';
	import GlobalDrawer from '$components/Drawer/GlobalDrawer/GlobalDrawer.svelte';
</script>

<Toast />
<GlobalDrawer />

<slot />
