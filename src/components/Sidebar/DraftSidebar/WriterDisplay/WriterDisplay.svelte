<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';

	export let name: string;
	export let level: number;
	export let avatarUrl: string;
</script>

<div class="flex flex-col justify-center items-center gap-3">
	<div class="relative inline-block">
		<span class="badge variant-filled-primary absolute -top-1 -right-1 z-10">Lv {level}</span>

		<Avatar width="w-24" src={avatarUrl} />
	</div>
	<div class="">
		<span class="text-lg font-bold">{name}</span>
	</div>
</div>
