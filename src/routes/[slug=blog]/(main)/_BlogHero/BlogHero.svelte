<script lang="ts">
	import type { LayoutData } from '../$types';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let blogUser: LayoutData['blogUser'];
</script>

<div class="mb-20 text-center">
	<h2
		class="!text-xl underline underline-offset-[12px] decoration-surface-400 decoration-1 !leading-9"
	>
		국가간에 우호관계의 인간은
	</h2>
	<div>...</div>
</div>

<div class="relative left-1/2 w-[50%]">
	<hr class="!border-t-surface-400" />
	<i class="ri-edit-circle-line absolute -translate-y-1/2 text-surface-100 -left-3" />
	<div class="absolute left-[50%] -translate-x-[50%] -translate-y-1/2">
		<span class="badge variant-filled-primary absolute -top-1 -right-1 z-10"
			>Lv {blogUser.level}</span
		>
		<Avatar width="w-24" src={blogUser.avatarUrl} />
	</div>
</div>

<div class="flex items-center gap-4 mt-12 px-5">
	<ul class="flex flex-col gap-7">
		<li class="flex flex-col gap-3">
			<span class="text-3xl font-bold font-serif">{blogUser.name}</span>
			<span class="text-surface-400">{blogUser.class}</span>
		</li>

		<li class="flex items-center gap-2 text-sm font-serif">
			<span class="">3 publications</span>
			<span>·</span>
			<span class="">12 followers</span>
			<span>·</span>
			<span class="">14 following</span>
		</li>
	</ul>
</div>
