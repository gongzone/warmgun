<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';

	import Alert from '$components/Message/Alert.svelte';
	import LabelInput from '$components/Form/LabelInput.svelte';

	export let form: ActionData;

	let isVisible = false;
	let errorMessage = '';

	$: if (form) {
		isVisible = !form.success;
		errorMessage = form.message;
	}
</script>

<form method="POST" use:enhance>
	<div class="space-y-5 mb-8">
		<Alert {isVisible} {errorMessage} />

		<LabelInput type="text" name="username">
			<svelte:fragment slot="labelText">아이디</svelte:fragment>
			<svelte:fragment slot="icon"><i class="ri-user-line" /></svelte:fragment>
		</LabelInput>

		<LabelInput type="password" name="password">
			<svelte:fragment slot="labelText">비밀번호</svelte:fragment>
			<svelte:fragment slot="icon"><i class="ri-lock-password-line" /></svelte:fragment>
		</LabelInput>
	</div>

	<button type="submit" class="w-full btn variant-filled-primary">로그인</button>
</form>
