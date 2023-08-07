<script lang="ts">
	import { onDestroy } from 'svelte';
	import { createQuery } from '@tanstack/svelte-query';

	import type { Tag } from '$lib/types/tag';

	import CloseIcon from '$components/@icons/CloseIcon.svelte';
	import { triggerToast } from '$components/@ui/Toast/toast';
	import { api } from '$lib/api/api';

	export let tags: string[] = [];

	let input: string = '';
	let debouncedInput: string = '';
	let fetchedTags: Tag[] = [];
	let timer: NodeJS.Timer;

	$: searchTagQuery = createQuery({
		queryKey: ['search', 'tags', debouncedInput, 5],
		queryFn: api().search<Tag>,
		keepPreviousData: true,
		enabled: !!debouncedInput
	});

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

			if (!/^[0-9가-힣A-Za-z\s\-]+$/.test(e.target.value)) {
				return triggerToast(
					'warning',
					'태그는 오직 문자와 숫자, 그리고 대쉬와 공백으로만 설정할 수 있습니다.'
				);
			}

			const value = e.target.value.replace(/  +/g, ' ').trim().toLowerCase() as string;
			const newTag = value
				.split(' ')
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(' ');

			tags = [...tags, newTag];
			cleanInput();
		}
	};

	const onClickFetchedTag = (e: any) => {
		if (tags.find((tag) => tag === e.target.dataset.name)) {
			return cleanInput();
		}

		tags = [...tags, e.target.dataset.name];
		cleanInput();
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
		<ul class="absolute w-full bg-surface-500 rounded-lg shadow-lg overflow-hidden z-20">
			{#each $searchTagQuery.data.data as tag (tag.id)}
				<li>
					<button
						type="button"
						data-name={tag.name}
						on:click={onClickFetchedTag}
						class="w-full h-full p-3 hover:bg-secondary-700 text-left"
					>
						<span data-name={tag.name}>{tag.name}</span>
						<span data-name={tag.name} class="text-sm">({tag._count.articles})</span>
					</button>
				</li>
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
