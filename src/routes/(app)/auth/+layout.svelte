<script lang="ts">
	import { page } from '$app/stores';

	$: isSignupRoute = $page.url.pathname === '/auth/signup';
</script>

<div class="max-w-[420px] mx-auto ">
	<div class="flex flex-col gap-2 mt-4 mb-8">
		<p class="unstyled text-4xl font-bold">Simplicity</p>
		<p class="unstyled text-2xl font-bold">is the soul of Efficiency</p>
	</div>

	<slot />

	<div class="my-4 text-center">
		<span>{isSignupRoute ? '이미 계정이 있으신가요?' : '계정이 없으신가요?'}</span>
		<a href={isSignupRoute ? '/auth/login' : '/auth/signup'}>
			{isSignupRoute ? '로그인' : '회원가입'}
		</a>
	</div>
</div>
