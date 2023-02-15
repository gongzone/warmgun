<script lang="ts">
	import { menu } from '@skeletonlabs/skeleton';

	import type { AuthenticatedUser } from '$lib/types/user';

	import UserAvatar from '$components/User/UserAvatar.svelte';

	export let user: AuthenticatedUser;
</script>

<div class="relative">
	<button type="button" use:menu={{ menu: 'avatar-menu' }} class="btn-icon md:btn-icon-lg px-0">
		<UserAvatar width="md:w-[53px]" src={user?.avatar} />
	</button>

	<nav class="w-64 p-4 shadow-xl list-nav card" data-menu="avatar-menu">
		<ul>
			{#if user?.role === 'ADMIN'}
				<li>
					<a href="/admin">⚙️ 관리자 페이지</a>
				</li>
			{/if}
			<li>
				<a href={`/@${user?.username}`}
					><span class="badge-icon py-4"><i class="ri-community-line ri-xl" /></span>
					<span class="flex-auto">내 블로그</span>
				</a>
			</li>
			<li>
				<a href={`/write/draft/${user?.latestDraftId}`}>
					<span class="badge-icon py-4"><i class="ri-quill-pen-line ri-xl" /></span>
					<span class="flex-auto">글쓰기</span>
				</a>
			</li>
			<li>
				<form method="POST" action="/auth/logout">
					<button class="w-full option">로그아웃</button>
				</form>
			</li>
		</ul>
	</nav>
</div>
