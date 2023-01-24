<script>
	import { Drawer } from '@skeletonlabs/skeleton';

	import WriteHeader from './_WriteHeader/WriteHeader.svelte';
	import WriteSidebar from './_WriteSidebar/WriteSidebar.svelte';
</script>

<Drawer>
	<WriteSidebar />
</Drawer>

<WriteHeader />

<main class="p-5">
	<slot />
</main>
