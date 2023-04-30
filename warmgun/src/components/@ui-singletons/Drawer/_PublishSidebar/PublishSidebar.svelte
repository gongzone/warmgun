<script lang="ts">
	import { page } from '$app/stores';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { drawerStore } from '@skeletonlabs/skeleton';
	import CloseIcon from '~icons/ri/close-line';

	import type { PublishMeta } from '$components/@ui-singletons/Drawer/drawer';
	import type { OutputData } from '@editorjs/editorjs';

	$: ({ title, subTitle, body } = $drawerStore.meta as PublishMeta);
</script>

<header class="flex justify-between px-3 sm:px-5 py-4">
	<button type="button" class="btn btn-ringed-tertiary" on:click={() => drawerStore.close()}>
		<CloseIcon class="w-6 h-6" />
		<span>닫기</span>
	</button>

	<button type="button" class="btn variant-filled-primary">출간하기</button>
</header>

<hr />

<ul class="space-y-10 px-8 py-8 sm:px-12">
	<li>
		<div class="flex flex-col justify-center items-center" />
	</li>

	<li>s</li>

	<li>
		<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-md">
			<div class="input-group-shim">/</div>
			<input type="text" name="slug" />
		</div>
	</li>

	<div class="h-40" />
</ul>
