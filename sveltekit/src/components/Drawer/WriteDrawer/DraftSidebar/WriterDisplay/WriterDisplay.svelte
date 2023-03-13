<script lang="ts">
	import UserAvatar from '$components/User/UserAvatar.svelte';

	export let name: string;
	export let avatar: string | undefined | null;
</script>

<div class="flex flex-col justify-center items-center gap-2">
	<UserAvatar width="w-24" src={avatar} />
	<span class="text-lg font-bold">{name}</span>
</div>
