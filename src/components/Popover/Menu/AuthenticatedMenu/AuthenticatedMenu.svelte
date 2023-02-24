<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	import type { AuthenticatedUser } from '$lib/types/user';

	import UserAvatar from '$components/User/UserAvatar.svelte';

	export let user: AuthenticatedUser;

	const menuKey = 'authenticated-menu';
	const authenticatedMenuSettings: PopupSettings = {
		event: 'click',
		target: menuKey
	};
</script>

<div>
	<button use:popup={authenticatedMenuSettings} class="btn-icon md:btn-icon-lg px-0">
		<UserAvatar width="md:w-[53px]" src={user?.avatar} />
	</button>

	<div class="relative card w-52 md:w-60 p-4 shadow-xl z-50" data-popup={menuKey}>
		<nav class="list-nav">
			<ul>
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
</div>
