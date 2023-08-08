<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let q: string = '';

	const enterHandler = (e: KeyboardEvent) => {
		if (e.key === 'Enter' && !!q) {
			goto(`${$page.url.pathname}?q=${q}`);
		}
	};
</script>

<input
	type="search"
	class="input h-16 rounded-md focus:border-tertiary-500"
	placeholder="검색어를 입력하고 엔터키를 누르세요."
	bind:value={q}
	on:keypress={enterHandler}
/>
