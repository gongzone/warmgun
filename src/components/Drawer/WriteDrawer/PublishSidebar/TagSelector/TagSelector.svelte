<script lang="ts">
	import { debounce } from '$lib/utils/debounce';
	import { getTagsByInput } from '$lib/client-fetch/tag';

	interface Tag {
		name: string;
	}

	export let tags: string[] = [];
	let fetchedTags: Tag[] | null = null;
	let value: string | null = null;

	const fetchTags = (e: any) =>
		debounce(async () => {
			if (e.target.value === '') {
				fetchedTags = null;
				return;
			}
			fetchedTags = await getTagsByInput(e.target.value, tags);
		}, 300);

	const onClickHandler = (e: any) => {
		const name = fetchedTags![e.target.dataset.index].name;

		if (tags.find((tag) => tag === name)) {
			value = '';
			fetchedTags = null;
			return;
		}
		tags = [...tags, name];
		value = '';
		fetchedTags = null;
	};
</script>

<div class="relative">
	<input
		on:input={fetchTags}
		on:keypress={(e) => {
			if (e.key === 'Enter') {
				if (value) {
					if (tags.find((tag) => tag === value)) {
						value = '';
						fetchedTags = null;
						return;
					}
					tags = [...tags, value];
					value = '';
					fetchedTags = null;
				}
			}
		}}
		disabled={tags.length >= 5}
		type="text"
		bind:value
		placeholder={tags.length >= 5 ? '태그 선택은 5개까지만 가능합니다.' : '태그를 선택해주세요'}
		class="input rounded-md"
	/>

	{#if fetchedTags && fetchedTags.length > 0}
		<div class="absolute w-full bg-surface-500 rounded-sm shadow-lg">
			<ul>
				{#each fetchedTags as tag, index (tag.name)}
					<li>
						<button
							type="button"
							on:click={onClickHandler}
							data-index={index}
							class="w-full h-full p-3 hover:bg-slate-700 text-left">{tag.name}</button
						>
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
