<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';

	export let userCharacter;
</script>

<div class="flex flex-col justify-center items-center gap-3">
	<div class="relative inline-block">
		<span class="badge badge-filled-primary absolute -top-1 -right-1 z-10"
			>Lv {user.character.level}</span
		>

		<Avatar width="w-24" src={allAvatars[user.character.mainAvatar].url} />
	</div>
	<div class="">
		<span class="text-lg font-bold">{user.character.name}</span>
	</div>
</div>
