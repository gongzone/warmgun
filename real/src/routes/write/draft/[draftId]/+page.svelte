<script lang="ts">
	import type { ActionData, PageData } from './$types';

	import WriteHeader from '$lib/components/Header/WriteHeader/WriteHeader.svelte';
	import { triggerToast } from '$lib/components/@ui/Toast/toast';

	export let data: PageData;
	export let form: ActionData;

	$: if (form?.message) {
		triggerToast(`${form.isSuccess ? 'success' : 'warning'}`, form.message);
	}
</script>

<WriteHeader />
