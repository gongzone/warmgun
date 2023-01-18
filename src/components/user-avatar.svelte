<script lang="ts">
	import { Avatar, menu } from '@skeletonlabs/skeleton';

	import type { CurrentUser } from '$lib/types/current-user';
	import { allAvatars } from '$lib/character/avatar';

	import DefaultAvatar from '$components/@svg/default-avatar.svelte';

	export let user: CurrentUser = null;
</script>

<div class="relative">
	<button
		use:menu={{ menu: 'user-menu' }}
		class={`btn-icon w-12 px-0 ${
			!user ? 'btn-ringed ring-[1.5px] dark:ring-zinc-500 hover:dark:ring-gray-400' : ''
		}`}
	>
		{#if !user || !user.character}
			<DefaultAvatar />
		{:else}
			<Avatar src={allAvatars[user.character.mainAvatar].url} />
		{/if}
	</button>

	<nav class="w-64 p-4 shadow-xl list-nav card" data-menu="user-menu">
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
					<a href={`/write`}>글쓰기</a>
				</li>
				<li>
					<a href={`/@${user.username}`}>내 블로그</a>
				</li>
				<li>
					<form method="POST" action="/auth/logout">
						<button class="w-full option">로그아웃</button>
					</form>
				</li>
			{/if}
		</ul>
	</nav>
</div>
