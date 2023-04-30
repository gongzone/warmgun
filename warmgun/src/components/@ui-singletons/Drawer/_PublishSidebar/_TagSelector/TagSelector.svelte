<script lang="ts">
	import CloseIcon from '~icons/ri/close-line';

	import { debounce } from '$lib/utils/debounce';
	import { search } from '$lib/client/search';

	export let tags: string[] = [];
	let input: string = '';
	let fetchedTags: { name: string; _count: { articles: number } }[] = [];
	let timer: NodeJS.Timer;

	const clean = () => {
		input = '';
		fetchedTags = [];
	};

	const onChangeInput = (e: any) =>
		debounce(
			timer,
			async () => {
				if (e.target.value === '') {
					fetchedTags = [];
					return;
				}

				const { data, nextCursor } = await search(e.target.value, {
					mode: 'tags',
					take: 10,
					cursor: 0
				});
				fetchedTags = data;
			},
			500
		);

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

	const onClickFetchedTag = (e: any) => {
		console.log(fetchedTags, e.target);

		if (tags.find((tag) => tag === e.target.dataset.name)) {
			return clean();
		}
		tags = [...tags, e.target.dataset.name];
		clean();
	};
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

	{#if fetchedTags.length > 0}
		<div class="absolute w-full bg-surface-500 rounded-sm shadow-lg">
			<ul>
				{#each fetchedTags as tag, index (tag.name)}
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
								tags = t;
							}}
							type="button"
							data-index={index}
							class="chip variant-filled-tertiary"
						>
							<span>{tag}</span>
							<span><CloseIcon /></span>
						</button>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>
