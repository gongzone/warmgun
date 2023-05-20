<script lang="ts">
	import UserAvatar from '$components/@ui/UserAvatar.svelte';
	import ArrowRightTwoIcon from '$components/@icons/ArrowRightTwoIcon.svelte';

	export let username: string;
	export let avatar: string | null | undefined;
	export let bio: string | undefined;
	export let field: string | undefined;
	export let followedByCount: number;
	export let followingCount: number;
	export let articleCount: number;
</script>

<div class="shadow-xl">
	<header class="grid grid-cols-3 gap-8 items-center p-4 bg-neutral-100 text-neutral-800">
		<UserAvatar src={avatar} width="w-full" rounded="rounded-lg" />
		<div class="col-span-2 space-y-2">
			<span class="opacity-50 line-clamp-1 sm:text-lg">{field}</span>
			<span class="font-serif font-semibold line-clamp-1 text-lg sm:text-2xl">{username}</span>
			<p class="font-light line-clamp-2 break-all sm:text-lg">{bio}</p>
		</div>
	</header>

	<footer class="flex justify-between items-center p-8 sm:p-10 bg-white text-neutral-800">
		<div class="grid grid-cols-3">
			<div class="flex flex-col">
				<span class="font-semibold text-xs sm:text-sm">구독자</span>
				<span class="font-light text-sm">{followedByCount}</span>
			</div>
			<div class="flex flex-col">
				<span class="font-semibold text-xs sm:text-sm">팔로잉</span>
				<span class="font-light text-sm">{followingCount}</span>
			</div>
			<div class="flex flex-col">
				<span class="font-semibold text-xs sm:text-sm">작성한 아티클</span>
				<span class="font-light text-sm">{articleCount}</span>
			</div>
		</div>

		<div>
			<a
				href={`/@${username}`}
				class="btn-icon bg-surface-900 shadow-lg text-surface-50 hover:bg-surface-50 hover:text-surface-900 hover:border hover:border-surface-300"
			>
				<ArrowRightTwoIcon />
			</a>
		</div>
	</footer>
</div>
