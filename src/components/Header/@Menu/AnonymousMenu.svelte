<script lang="ts">
	import { menu } from '@skeletonlabs/skeleton';
</script>

<div class="relative">
	<button
		type="button"
		use:menu={{ menu: 'anonymous-menu' }}
		class="btn-icon variant-ringed-tertiary ring-[1.5px] md:btn-icon-lg"
	>
		<i class="ri-user-line ri-lg" />
	</button>

	<nav class="w-64 p-4 shadow-xl list-nav card" data-menu="anonymous-menu">
		<ul>
			<li><a href="/auth/login">로그인</a></li>
			<li><a href="/auth/signup">회원가입</a></li>
		</ul>
	</nav>
</div>
