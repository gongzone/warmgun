<script lang="ts">
	import { Viewer } from 'bytemd';
	import gfm from '@bytemd/plugin-gfm';
	import highlight from '@bytemd/plugin-highlight-ssr';

	export let body = '';

	const plugins = [gfm(), highlight()];
</script>

<Viewer value={body} {plugins} />
