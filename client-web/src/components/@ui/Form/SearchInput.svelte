<script lang="ts">
	import { goto } from '$app/navigation';
	import SearchIcon from '~icons/ri/search-line';

	export let size: 'sm' | 'base' | 'lg' = 'base';

	let value: string;

	$: classesSize = size === 'sm' ? 'h-10' : size === 'base' ? 'h-12' : size === 'lg' ? 'h-14' : '';

	const onKeypressHandler = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			goto(`/search/${value}`);
		}
	};
</script>

<div class="input-group input-group-divider grid-cols-[1fr_auto_auto] {classesSize}">
	<input
		class="input"
		type="search"
		placeholder="검색어를 입력하세요"
		bind:value
		on:keypress={onKeypressHandler}
	/>
	<a href={`/search/${value}`} class="unstyled">
		<span class="px-2 md:px-3">
			<SearchIcon />
		</span>
	</a>
</div>
