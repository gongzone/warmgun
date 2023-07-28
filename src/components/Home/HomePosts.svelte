<script lang="ts">
	import UserAvatar from '$components/@ui/UserAvatar.svelte';
	import TextWithIcon from '$components/@ui/TextWithIcon.svelte';

	import LikeIcon from '$components/@icons/LikeIcon.svelte';
	import CommentIcon from '$components/@icons/CommentIcon.svelte';

	export let title: string;
</script>

<div>
	<span class="font-semibold block text-lg">{title}</span>
	<ul>
		{#each { length: 5 } as _, i (i)}
			<li>
				<div class="py-3 space-y-2 border-b border-b-surface-600">
					<UserAvatar name="shadcn" src="https://github.com/shadcn.png" width="w-6" />

					<h2 class="font-bold line-clamp-1">
						개발자가 사랑하는 프론트엔드 프레임워크1 스벨트[Svelte]의 특징
					</h2>
				</div>
			</li>
		{/each}
	</ul>
</div>
