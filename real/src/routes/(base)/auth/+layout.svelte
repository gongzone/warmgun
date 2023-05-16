<script lang="ts">
	import { page } from '$app/stores';
	import ServiceIcon from '$lib/components/@icons/ServiceIcon.svelte';

	$: isLoginPage = $page.url.pathname === '/auth/login';
</script>

<div class="mx-auto max-w-[438px] space-y-6 py-6 md:py-20">
	<div class="flex itmes-center gap-2">
		<span class="badge-icon variant-filled w-7 h-7"><ServiceIcon class="w-5 h-5" /></span>
		<span class="text-3xl font-heading-token">{isLoginPage ? '로그인' : '회원가입'}</span>
	</div>

	<div>
		<blockquote class="blockquote">
			<h2 class="text-2xl font-heading-token">Warmgun에서</h2>
			<h2 class="text-2xl font-heading-token">당신의 이야기를 들려주세요.</h2>
		</blockquote>
	</div>

	<main class="">
		<slot />
	</main>

	<div class="text-center">
		<span>{isLoginPage ? '계정이 없으신가요?' : '이미 계정이 있으신가요?'}</span>
		<a class="text-primary-500 hov" href={isLoginPage ? '/auth/signup' : '/auth/login'}>
			{isLoginPage ? '회원가입' : '로그인'}
		</a>
	</div>
</div>
