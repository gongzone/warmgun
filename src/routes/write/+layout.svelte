<script>
	import { Drawer } from '@skeletonlabs/skeleton';

	import WriteHeader from './_WriteHeader/WriteHeader.svelte';
	import WriteSidebar from './_WriteSidebar/WriteSidebar.svelte';
</script>

<Drawer width="w-full" duration={200}>
	<WriteSidebar />
</Drawer>

<WriteHeader />

<main class="p-5 md:p-10 lg:p-14">
	<slot />
</main>

<div class="h-10" />
