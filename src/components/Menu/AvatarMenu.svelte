<script lang="ts">
	import type { Role } from '@prisma/client';
	import { Avatar, menu } from '@skeletonlabs/skeleton';

	type AvatarMenuUser = {
		avatarUrl: string;
		role: Role;
		blogUrl: string;
		recentDraftId: number;
	};

	export let user: AvatarMenuUser;
</script>

<div class="relative">
	<button type="button" use:menu={{ menu: 'avatar-menu' }} class="btn-icon w-12 px-0">
		<Avatar src={user.avatarUrl} />
	</button>

	<nav class="w-64 p-4 shadow-xl list-nav card" data-menu="avatar-menu">
		<ul>
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
		</ul>
	</nav>
</div>
