<script lang="ts">
	import { onDestroy } from 'svelte';
	import { createInfiniteQuery } from '@tanstack/svelte-query';

	import type { Tag } from '$lib/types/Tag';
	import { search } from '$lib/client-fetch/search';

	import CloseIcon from '$lib/components/@icons/CloseIcon.svelte';

	export let tags: string[] = [];

	let input: string = '';
	let debouncedInput: string = '';
	let fetchedTags: Tag[] = [];
	let timer: NodeJS.Timer;

	$: searchTagQuery = createInfiniteQuery({
		queryKey: ['search', 'tags', debouncedInput],
		queryFn: () =>
			search<Tag[]>(debouncedInput, {
				mode: 'tags',
				take: 10,
				cursor: 0
			}),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		keepPreviousData: true,
		enabled: !!debouncedInput
	});

	$: console.log($searchTagQuery.data);

	const cleanInput = () => {
		input = '';
		debouncedInput = '';
	};

	const debounce = (cb: () => Promise<void> | void, delay: number) => {
		clearTimeout(timer);
		timer = setTimeout(cb, delay);
	};

	const onChangeInput = (e: any) =>
		debounce(() => {
			debouncedInput = e.target.value;
		}, 500);

	const onKeypress = (e: any) => {
		if (e.key === 'Enter' && !!e.target.value) {
			if (tags.find((tag) => tag === e.target.value)) {
				return cleanInput();
			}

			tags = [...tags, e.target.value];
			cleanInput();
		}
	};

	const onClickFetchedTag = (e: any) => {
		if (tags.find((tag) => tag === e.target.dataset.name)) {
			return cleanInput();
		}

		tags = [...tags, e.target.dataset.name];
		e.target.value();
	};

	onDestroy(() => {
		clearTimeout(timer);
	});
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

	{#if $searchTagQuery.isSuccess}
		<ul>
			{#each $searchTagQuery.data.pages as { data }}
				{#each data as tag (tag.id)}
					<li>
						<button
							type="button"
							data-name={tag.name}
							on:click={onClickFetchedTag}
							class="w-full h-full p-3 hover:bg-slate-700 text-left"
						>
							<span data-name={tag.name}>{tag.name}</span>
							<span data-name={tag.name} class="text-sm font-bold">({tag._count.articles})</span>
						</button>
					</li>
				{/each}
			{/each}
		</ul>
	{/if}

	{#if tags.length > 0}
		<div class="mt-2">
			<ul class="flex flex-wrap gap-1">
				{#each tags as tag, index (tag)}
					<li>
						<button
							on:click={(e) => {
								const filteredTags = tags.filter(
									(tag) => tag !== e.currentTarget.textContent?.trim()
								);
								tags = filteredTags;
							}}
							type="button"
							data-index={index}
							class="chip variant-filled-tertiary"
						>
							<span>{tag}</span>
							<CloseIcon class="w-4 h-4" />
						</button>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>
