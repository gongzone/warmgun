<script lang="ts">
	import UserAvatar from '$components/@ui/UserAvatar.svelte';
	import type { BlogUser } from '$lib/types/user';
	import TextWithIcon from '$components/@ui/TextWithIcon.svelte';
	import HeartIcon from '$components/@icons/HeartIcon.svelte';
	import ArticleIcon from '$components/@icons/ArticleIcon.svelte';

	export let users: BlogUser[];
</script>

<div>
	{#each users as user (user.id)}
		<div class="flex items-center justify-between gap-3">
			<div class="space-y-2">
				<div class="flex items-center gap-2">
					<UserAvatar
						name={user.profile?.nickname}
						subText={user.profile?.field}
						src={user.profile?.avatar}
						nameClasses="text-lg font-semibold"
						width="w-10"
					/>
					<span>·</span>
					<div class="flex items-center gap-1">
						<TextWithIcon size="sm" icon={HeartIcon}>
							{user._count.followedBy}
						</TextWithIcon>
						<TextWithIcon size="sm" icon={ArticleIcon}>
							{user._count.articles}
						</TextWithIcon>
					</div>
				</div>

				<div>
					<p class="text-sm font-extralight">{user.profile?.bio}</p>
				</div>
			</div>

			<div class="">
				<a href={`@${user.username}`} class="btn btn-sm variant-ringed-tertiary">보러가기</a>
			</div>
		</div>
	{/each}
</div>
