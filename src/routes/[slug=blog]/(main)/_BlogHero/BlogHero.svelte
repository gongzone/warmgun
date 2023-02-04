<script lang="ts">
	import type { LayoutData } from '../$types';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let bloger: LayoutData['bloger'];
</script>

<div
	class="flex flex-col-reverse gap-3 sm:flex-row sm:gap-0 justify-between sm:min-h-[304px] bg-surface-800 p-7 sm:p-10 rounded-md shadow-md"
>
	<div class="sm:self-end">
		<div class="flex flex-col gap-2">
			<span class="text-2xl sm:text-3xl !font-bold font-serif">{bloger.nickname}</span>
			<span class="text-sm sm:text-base text-surface-400">{bloger.description}</span>
			<div class="text-sm font-serif space-x-1">
				<span class="">{bloger._count.articles} publications</span>
				<span>·</span>
				<span class="">{bloger._count.followedBy} followers</span>
				<span>·</span>
				<span class="">{bloger._count.following} following</span>
			</div>
		</div>
	</div>

	<div class="">
		<Avatar width="w-24 sm:w-28" src={bloger.avatar ?? '/avatars/monkey.svg'} />
	</div>
</div>
