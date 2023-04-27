<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import UserIcon from '~icons/ri/user-line';
	import PasswordIcon from '~icons/ri/lock-password-line';

	import { triggerToast } from '$components/@ui-singletons/Toast/toast';
	import FormInput from '$components/@ui-elements/FormInput.svelte';

	export let form: ActionData;

	$: if (form?.message) {
		triggerToast('warning', form.message);
	}
</script>

<form method="POST" use:enhance>
	<div class="space-y-5 mb-8">
		<FormInput type="text" name="username" labelText="아이디" placeholder="아이디를 입력하세요.">
			<svelte:fragment slot="icon"><UserIcon /></svelte:fragment>
		</FormInput>
		<FormInput
			type="password"
			name="password"
			labelText="비밀번호"
			placeholder="비밀번호를 입력하세요."
		>
			<svelte:fragment slot="icon"><PasswordIcon /></svelte:fragment>
		</FormInput>
	</div>

	<button type="submit" class="w-full btn variant-filled-primary">로그인</button>
</form>
