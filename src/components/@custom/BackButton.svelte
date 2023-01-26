<script lang="ts">
	import { afterNavigate } from '$app/navigation';

	export let fallback: string = '/';

	let previousPage: string;

	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || fallback;
	});
</script>

<a href={previousPage} class="btn-icon"><i class="ri-arrow-left-line ri-lg" /></a>
