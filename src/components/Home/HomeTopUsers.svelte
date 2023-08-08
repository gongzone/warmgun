<script lang="ts">
	import UserAvatar from '$components/@ui/UserAvatar.svelte';
	import type { BlogUser } from '$lib/types/user';
	import TextWithIcon from '$components/@ui/TextWithIcon.svelte';
	import HeartIcon from '$components/@icons/HeartIcon.svelte';
	import ArticleIcon from '$components/@icons/ArticleIcon.svelte';
	import Separator from '$components/@ui/Separator.svelte';
	import NoDataCard from '$components/@ui/NoDataCard.svelte';

	export let users: BlogUser[];
</script>

{#if users.length > 0}
	<div class="flex flex-col gap-4">
		{#each users as user (user.id)}
			<div class="card flex items-center justify-between gap-4 p-4 rounded-md">
				<div class="space-y-1">
					<div class="flex items-center gap-2">
						<a href="/@{user.username}">
							<UserAvatar
								name={user.profile?.nickname}
								subText={user.profile?.field}
								src={user.profile?.avatar}
								width="w-10"
							/>
						</a>
					</div>

					<div>
						<p class="text-sm font-light line-clamp-2">{user.profile?.bio}</p>
					</div>
				</div>

				<div class="">
					<a href="/@{user.username}" class="btn btn-sm variant-ringed-tertiary">보러가기</a>
				</div>
			</div>
		{/each}
	</div>
{:else}
	<NoDataCard />
{/if}
