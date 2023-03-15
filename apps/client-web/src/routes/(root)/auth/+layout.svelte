<script lang="ts">
	import { page } from '$app/stores';

	$: isSignupRoute = $page.url.pathname === '/auth/signup';
</script>

<main class="px-[5vw] py-6 md:py-14">
	<div class="max-w-[438px] mx-auto">
		<div class="flex flex-col gap-2">
			<span class="text-4xl font-bold">Simplicity</span>
			<span class="text-2xl font-bold">is the soul of Efficiency</span>
		</div>

		<div class="mt-6 mb-4">
			<slot />
		</div>

		<div class="text-center">
			<span>{isSignupRoute ? '이미 계정이 있으신가요?' : '계정이 없으신가요?'}</span>
			<a href={isSignupRoute ? '/auth/login' : '/auth/signup'}>
				{isSignupRoute ? '로그인' : '회원가입'}
			</a>
		</div>
	</div>
</main>
