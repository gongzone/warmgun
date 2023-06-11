<script lang="ts">
	import UserAvatar from '$components/@ui/UserAvatar.svelte';

	export let username: string;
	export let nickname: string | undefined;
	export let field: string | undefined;
	export let avatar: string | null | undefined;
</script>

<header class="flex items-center justify-between">
	<a href={`/@${username}`} class="flex items-center gap-2">
		<UserAvatar src={avatar} width="w-12" />
		<div class="flex flex-col">
			<span>{nickname}</span>
			<span class="font-extralight opacity-75">
				{field}
			</span>
		</div>
	</a>
</header>
