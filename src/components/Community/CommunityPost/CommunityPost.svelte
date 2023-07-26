<script lang="ts">
	import UserAvatar from '$components/@ui/UserAvatar.svelte';
	import TextWithIcon from '$components/@ui/TextWithIcon.svelte';

	import LikeIcon from '$components/@icons/LikeIcon.svelte';
	import CommentIcon from '$components/@icons/CommentIcon.svelte';
</script>

<div class="py-6 border-b border-b-surface-600 space-y-4">
	<div class="space-y-2">
		<div class="flex items-center gap-1">
			<UserAvatar src="https://github.com/shadcn.png" name="감자예요" width="w-10" />
			<span>·</span>
			<span class="font-extralight">한달 전</span>
		</div>

		<h2 class="text-base font-medium max-w-[700px] line-clamp-1">
			자바의 정석 며칠만 빠르게 보려고 하는데 어떻게 공부하면 좋을까요?
		</h2>
	</div>

	<div class="flex items-center gap-2">
		<TextWithIcon icon={LikeIcon}>9</TextWithIcon>
		<TextWithIcon icon={CommentIcon}>36</TextWithIcon>
	</div>
</div>
