<script lang="ts">
	import { page } from '$app/stores';

	import UserAvatar from '$components/@ui/UserAvatar.svelte';
	import NoDataCard from '$components/@ui/NoDataCard.svelte';
</script>

{#if $page.data.user}
	<div class="flex flex-col justify-center items-center gap-2">
		<UserAvatar src={$page.data.user.profile?.avatar} width="w-24" />
		<span class="text-lg font-bold">{$page.data.user.username}</span>
	</div>
{:else}
	<NoDataCard text="유저 데이터가 존재하지 않습니다." />
{/if}
