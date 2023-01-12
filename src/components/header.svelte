<script lang="ts">
	import { AppBar, Avatar, menu } from '@skeletonlabs/skeleton';

	import type { CurrentUser } from '$lib/types/current-user';

	import MainLogo from '$components/@svg/main-logo.svelte';
	import Hamburger from '$components/@svg/hamburger.svelte';
	import DefaultAvatar from '$components/@svg/default-avatar.svelte';

	export let user: CurrentUser = null;

	$: avatarUrl = user?.character.avatars.find((a) => a.equipped === true)?.url;
</script>

<AppBar padding="px-[5vw] py-9 md:py-12">
	<svelte:fragment slot="lead">
		<a href="/">
			<div class="flex items-center gap-1">
				<MainLogo />
				<div>
					<h2 class="font-logo text-3xl md:text-4xl">DevWarriors</h2>
					<span class="hidden md:block">개발 커뮤니티 & 블로그 서비스</span>
				</div>
			</div>
		</a>
	</svelte:fragment>

	<svelte:fragment slot="trail">
		<button
			class="btn-icon btn-ringed w-12 px-0 ring-[1.5px] dark:ring-zinc-500 hover:dark:ring-gray-400"
		>
			<Hamburger />
		</button>

		<div class="relative">
			<button
				use:menu={{ menu: 'user-menu' }}
				class={`btn-icon w-12 px-0 ${
					!user ? 'btn-ringed ring-[1.5px] dark:ring-zinc-500 hover:dark:ring-gray-400' : ''
				}`}
			>
				{#if !user}
					<DefaultAvatar />
				{:else}
					<Avatar src={avatarUrl} />
				{/if}
			</button>

			<nav class="list-nav card p-4 w-64 shadow-xl" data-menu="user-menu">
				<ul>
					{#if !user}
						<li><a href="/auth/login">로그인</a></li>
						<li><a href="/auth/signup">회원가입</a></li>
					{:else}
						{#if user.role === 'ADMIN'}
							<li>
								<a href="/admin">⚙️ 관리자 페이지</a>
							</li>
						{/if}
						<li>
							<a href="/">내 블로그</a>
						</li>
						<li>
							<form method="POST" action="/auth/logout">
								<button class="option w-full">로그아웃</button>
							</form>
						</li>
					{/if}
				</ul>
			</nav>
		</div>
	</svelte:fragment>
</AppBar>
