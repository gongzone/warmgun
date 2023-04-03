<script lang="ts">
	import UserAvatar from './UserAvatar.svelte';

	export let username: string;
	export let nickname: string;
	export let avatar: string | null;
	export let subText: string | undefined = undefined;
</script>

<div class="flex items-center gap-2">
	<a class="unstyled" href={`/@${username}`}>
		<UserAvatar {avatar} />
	</a>

	<div class="flex flex-col">
		<a class="unstyled" href={`/@${username}`}>
			<span class="font-bold">{nickname}</span>
		</a>
		{#if subText}
			<span class="text-sm font-thin text-surface-300 line-clamp-2">{subText}</span>
		{/if}
	</div>
</div>
