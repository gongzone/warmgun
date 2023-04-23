<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import BackIcon from '~icons/ri/arrow-left-line';

	import { openPublishSidebar } from '$components/Drawer/drawer';
	import type { OutputData } from '@editorjs/editorjs';

	export let getEditorData: () => Promise<{
		title: string;
		subTitle: string;
		body: OutputData;
		coverImage: string | null;
		slug: string;
		tags: string[];
	}>;
</script>

<AppBar padding="p-4 sm:p-5" slotLead="space-x-1 md:space-x-2" background="bg-transparent">
	<svelte:fragment slot="lead">
		<button class="btn-icon" on:click={() => history.back()}>
			<span><BackIcon class="w-[24px] h-[24px]" /></span>
		</button>
	</svelte:fragment>

	<svelte:fragment slot="trail">
		<button
			type="button"
			class="btn variant-filled-primary"
			on:click={async () => {
				const { title, subTitle, body, coverImage, slug, tags } = await getEditorData();
				openPublishSidebar({ title, subTitle, body, coverImage, slug, tags });
			}}>수정하기</button
		>
	</svelte:fragment>
</AppBar>
