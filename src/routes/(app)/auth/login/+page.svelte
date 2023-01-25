<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';

	import Alert from '$components/@custom/Alert.svelte';
	import FormInput from '$components/@custom/FormInput.svelte';

	export let form: ActionData;

	$: isVisible = !!form?.message;
	$: errorMessage = form?.message;
</script>

<form method="POST" use:enhance>
	<div class="space-y-5 mb-8">
		<Alert {isVisible} {errorMessage} />

		<FormInput type="text" name="username">
			<svelte:fragment slot="labelText">아이디</svelte:fragment>
			<svelte:fragment slot="icon"><i class="ri-user-line" /></svelte:fragment>
		</FormInput>

		<FormInput type="password" name="password">
			<svelte:fragment slot="labelText">비밀번호</svelte:fragment>
			<svelte:fragment slot="icon"><i class="ri-lock-password-line" /></svelte:fragment>
		</FormInput>
	</div>

	<button class="w-full btn variant-filled-primary btn-base">로그인</button>
</form>
