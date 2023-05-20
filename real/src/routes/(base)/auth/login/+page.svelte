<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';

	import { triggerToast } from '$components/@ui/Toast/toast';
	import UserIcon from '$components/@icons/UserIcon.svelte';
	import PasswordIcon from '$components/@icons/PasswordIcon.svelte';
	import FormInput from '$components/@ui/FormInput.svelte';

	export let form: ActionData;

	$: if (form?.message) {
		triggerToast('warning', form.message);
	}
</script>

<form method="POST" use:enhance>
	<div class="space-y-5 mb-8">
		<FormInput
			type="text"
			name="username"
			labelText="아이디"
			placeholder="아이디를 입력하세요."
			icon={UserIcon}
		/>
		<FormInput
			type="password"
			name="password"
			labelText="비밀번호"
			placeholder="비밀번호를 입력하세요."
			icon={PasswordIcon}
		/>
	</div>

	<button type="submit" class="w-full btn variant-filled-primary">로그인</button>
</form>
