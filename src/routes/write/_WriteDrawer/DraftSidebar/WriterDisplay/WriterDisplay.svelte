<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';

	export let name: string;
	export let avatarUrl: string;
</script>

<div class="flex flex-col justify-center items-center gap-3">
	<div>
		<Avatar width="w-24" src={avatarUrl} />
	</div>
	<div class="">
		<span class="text-lg font-bold">{name}</span>
	</div>
</div>
