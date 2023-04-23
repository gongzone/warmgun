<script lang="ts">
	import GoogleIcon from '~icons/ri/google-fill';
	import GithubIcon from '~icons/ri/github-fill';

	export let parent: any;
</script>

<div class="card p-8 w-modal shadow-xl space-y-7">
	<header class="text-2xl font-bold space-y-3">
		<h2>Warmgun</h2>
		<p>개발 커뮤니티 & 블로그 서비스</p>
	</header>

	<div class="flex flex-col items-center gap-3">
		<span class="text-sm text-surface-300">* 아래 로그인 방법 중 하나를 선택해주세요.</span>
		<div class="flex gap-4">
			<button class="btn variant-ringed-tertiary rounded-md">
				<GoogleIcon />
				<span>Google</span>
			</button>
			<button class="btn variant-ringed-tertiary rounded-md">
				<GithubIcon />
				<span>Github</span>
			</button>
		</div>
	</div>

	<footer class={parent.regionFooter}>
		<button class="btn variant-filled" on:click={parent.onClose}>닫기</button>
	</footer>
</div>
