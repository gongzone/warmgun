<script lang="ts">
	import { debounce } from '$lib/utils/debounce';
	import { searchTags } from '$api/tag';
	import { createQuery } from '@tanstack/svelte-query';

	interface FetchedTag {
		name: string;
	}

	export let tags: string[] = [];
	let input: string = '';

	$: searchTagsQuery = createQuery({
		queryKey: ['searchTags', input],
		queryFn: () => searchTags(input, tags.join()),
		onSuccess: (tags: FetchedTag[]) => {
			console.log(tags);
		},
		enabled: Boolean(input)
	});

	const clean = () => {
		input = '';
		$searchTagsQuery.remove();
	};

	const onChangeInput = (e: any) => {
		return debounce(async () => {
			input = e.target.value;
		}, 300);
	};

	const onKeypress = (e: any) => {
		if (e.key === 'Enter') {
			if (input) {
				if (tags.find((tag) => tag === input)) {
					return clean();
				}

				tags = [...tags, input];
				clean();
			}
		}
	};

	// const onClickFetchedTag = (e: any) => {
	// 	const name = $searchTagsQuery.data![e.target.dataset.index].name;

	// 	if (tags.find((tag) => tag === name)) {
	// 		value = '';
	// 		fetchedTags = null;
	// 		return;
	// 	}
	// 	tags = [...tags, name];
	// 	value = '';
	// 	fetchedTags = null;
	// };
</script>

<div class="relative">
	<input
		on:input={onChangeInput}
		on:keypress={onKeypress}
		bind:value={input}
		type="text"
		disabled={tags.length >= 5}
		placeholder={tags.length >= 5 ? '태그 선택은 5개까지만 가능합니다.' : '태그를 선택해주세요'}
		class="input rounded-md"
	/>

	{#if $searchTagsQuery.data}
		<div class="absolute w-full bg-surface-500 rounded-sm shadow-lg">
			<ul>
				{#each $searchTagsQuery.data as tag, index (tag.name)}
					<li>
						<button
							type="button"
							data-index={index}
							class="w-full h-full p-3 hover:bg-slate-700 text-left"
						>
							<span>{tag.name}</span>
							<!-- <span class="text-sm font-bold">({tag._count.articles})</span> -->
						</button>
					</li>
				{/each}
			</ul>
		</div>
	{/if}

	{#if tags.length > 0}
		<div class="mt-2">
			<ul class="flex flex-wrap gap-1">
				{#each tags as tag, index (tag)}
					<li>
						<button
							on:click={(e) => {
								const t = tags.filter((tag) => tag !== e.currentTarget.textContent?.trim());
								console.log(t, e.currentTarget.textContent);
								tags = t;
							}}
							type="button"
							data-index={index}
							class="chip variant-filled-tertiary"
						>
							<span>{tag}</span>
							<i class="ri-close-line ri-lg" />
						</button>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>
