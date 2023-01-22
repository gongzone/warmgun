<script>
	import '@fontsource/noto-sans-kr';
	import '@fontsource/concert-one';
	import 'remixicon/fonts/remixicon.css';

	import '../styles/themes/theme-polly.postcss';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../styles/global.postcss';
	import '../styles/editor.postcss';

	import Drawer from '$components/Drawer/Drawer.svelte';
</script>

<Drawer />

<slot />
