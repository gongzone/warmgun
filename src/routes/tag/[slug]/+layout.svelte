<script lang="ts">
	// import { enhance } from '$app/forms';
	// import type { LayoutServerData } from './$types';

	// import { formatCount } from '$lib/utils/format';

	// import TagIcon from '$components/@icons/TagIcon.svelte';
	// import FollowingIcon from '$components/@icons/FollowingIcon.svelte';
	// import ArticleIcon from '$components/@icons/ArticleIcon.svelte';
	// import TextWithIcon from '$components/@ui/TextWithIcon.svelte';
	// import TagTab from './_TagTab/TagTab.svelte';
	// import Seo from '$components/@utils/Seo.svelte';

	// export let data: LayoutServerData;

	// $: ({ tag, isFollowing } = data);

	// $: followTagAction = !isFollowing ? '?/followTag' : '?/unFollowTag';
</script>

<!-- <Seo title="태그" />

<div class="page-container space-y-8">
	<section class="space-y-3">
		<TextWithIcon icon={TagIcon} size="4xl" textClass="font-bold">{tag.name}</TextWithIcon>
		<div class="flex items-center gap-2">
			<TextWithIcon icon={FollowingIcon} size="sm"
				>{formatCount(tag._count.tagLikes)} 구독자</TextWithIcon
			>
			<span>᛫</span>
			<TextWithIcon icon={ArticleIcon} size="sm"
				>{formatCount(tag._count.articles)} 아티클</TextWithIcon
			>
		</div>
		<form method="POST" action={followTagAction} use:enhance>
			<input type="hidden" name="tagId" value={tag.id} />
			<button type="submit" class="btn variant-filled-primary text-sm"
				>{!isFollowing ? '구독하기' : '구독취소'}</button
			>
		</form>
	</section>

	<section>
		<TagTab />
	</section>

	<section>
		<slot />
	</section>
</div> -->

<slot />
