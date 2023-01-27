<script lang="ts">
	import type { LayoutData } from '../../$types';
	import { page } from '$app/stores';
	import { Avatar, menu } from '@skeletonlabs/skeleton';

	let user: LayoutData['user'];

	$: user = $page.data.user;
</script>

<div class="relative">
	<button
		use:menu={{ menu: 'user-menu' }}
		class={`btn-icon w-12 px-0 ${!user ? 'variant-ringed-tertiary ring-[1.5px]' : ''}`}
	>
		{#if !user}
			<i class="ri-user-line ri-lg" />
		{:else}
			<Avatar src={user.avatarUrl} />
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
					<a href={user.blogUrl}
						><span class="badge-icon py-4"><i class="ri-community-line ri-xl" /></span>
						<span class="flex-auto">내 블로그</span>
					</a>
				</li>
				<li>
					<a href={`/write/draft/${user.recentDraftId}`}>
						<span class="badge-icon py-4"><i class="ri-quill-pen-line ri-xl" /></span>
						<span class="flex-auto">글쓰기</span>
					</a>
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
