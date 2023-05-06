<script lang="ts">
	import { page } from '$app/stores';
	import ChatHeartIcon from '~icons/ri/chat-heart-line';

	import UserAvatar from '$components/@ui-elements/UserAvatar.svelte';
</script>

<div class="flex gap-8 items-center justify-between px-5 pt-20 pb-6 border-b border-b-surface-300">
	<div class="flex flex-col gap-2">
		<span class="text-5xl font-bold">공존깜냥이</span>
		<span class="text-2xl text-surface-400">Frontend</span>
		<span class="text-xl text-surface-400">안녕하세요. 공존깜냥이입니다.</span>
	</div>

	<div class="">
		<UserAvatar src={null} width="w-24 md:w-36" border="border-2 border-tertiary-500" />
	</div>

	<!-- <div class="space-y-4">
		<div class="text-sm space-x-1">
			<span class="">3 아티클</span>
			<span>·</span>
			<span class="">40 구독자</span>
			<span>·</span>
			<span class="">50 팔로잉</span>
		</div>

		<div class="mt-4">
			<button class="chip variant-filled-primary">
				<span><ChatHeartIcon /></span>
				<span>구독하기</span>
			</button>
		</div>
	</div> -->
</div>
