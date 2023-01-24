<script lang="ts">
	import type { LayoutData } from '../../$types';
	import { page } from '$app/stores';
	import { Avatar } from '@skeletonlabs/skeleton';

	let writer: LayoutData['writer'];

	$: writer = $page.data.writer;
</script>

<div class="flex flex-col justify-center items-center gap-3">
	<div class="relative inline-block">
		<span class="badge badge-filled-primary absolute -top-1 -right-1 z-10">Lv {writer.level}</span>

		<Avatar width="w-24" src={writer.avatarUrl} />
	</div>
	<div class="">
		<span class="text-lg font-bold">{writer.name}</span>
	</div>
</div>
