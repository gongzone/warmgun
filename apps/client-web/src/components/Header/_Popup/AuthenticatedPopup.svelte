<script lang="ts">
	import { popup, Avatar, type PopupSettings } from '@skeletonlabs/skeleton';
	import CommunityIcon from '~icons/ri/community-line';
	import QuillPenIcon from '~icons/ri/quill-pen-line';

	import type { GetMeResult } from '$api/me';

	export let user: GetMeResult;

	const popupKey = 'authenticated-menu';
	const settings: PopupSettings = {
		event: 'click',
		target: popupKey
	};

	const navData = [
		{ to: `/@${user?.username}`, name: '내 블로그' },
		{ to: `/write/draft`, name: '글쓰기' }
	];
</script>

<div>
	<button use:popup={settings} class="btn-icon md:btn-icon-lg px-0">
		<Avatar width="md:w-[53px]" src={user.profile.avatar} />
	</button>

	<div class="relative card w-52 p-4 shadow-xl z-50" data-popup={popupKey}>
		<nav class="list-nav">
			<ul>
				{#each navData as nav (nav.to)}
					<li>
						<a href={nav.to}>
							<span class="badge-icon py-4">
								{#if nav.name === '내 블로그'}
									<CommunityIcon />
								{:else if nav.name === '글쓰기'}
									<QuillPenIcon />
								{/if}
							</span>
							<span class="flex-auto">{nav.name}</span>
						</a>
					</li>
				{/each}

				<li>
					<button class="w-full option">로그아웃</button>
				</li>
			</ul>
		</nav>
	</div>
</div>
