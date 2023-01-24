<script lang="ts">
	import type { LayoutData } from '../../$types';
	import { page } from '$app/stores';
	import { AccordionGroup, AccordionItem } from '@skeletonlabs/skeleton';

	import { formatDate } from '$lib/utils/date';

	let writer: LayoutData['writer'];

	$: writer = $page.data.writer;
</script>

<AccordionGroup spacing="space-y-0" collapse={false}>
	<AccordionItem open>
		<div class="flex items-center" slot="lead"><i class="ri-draft-line" /></div>

		<span class="text-base font-bold" slot="summary">초고</span>

		<nav class="" slot="content">
			{#if writer.drafts}
				<ul class="flex flex-col gap-3">
					{#each writer.drafts as draft, index (draft.id)}
						<li>
							<a
								class="unstyled flex flex-col items-start px-6 py-3 bg-surface-800 rounded-lg hover:bg-secondary-800"
								href={`/write/draft/${draft.id}`}
							>
								<span class="">{draft.title ?? `무제 - ${index + 1}`}</span>
								<span class="text-sm">{draft.description ?? '내용 없음'}</span>
								<span class="text-xs self-end">{formatDate(draft.updatedAt)} 저장됨</span>
							</a>
						</li>
					{/each}
					<li>
						<a
							class="unstyled flex flex-col items-start px-6 py-2 bg-surface-800 rounded-lg"
							href={`/`}
						>
							<span class="">dsafasf</span>
							<span class="text-sm">내용 없음</span>
						</a>
					</li>
				</ul>
			{/if}
		</nav>
	</AccordionItem>
</AccordionGroup>
