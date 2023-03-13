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
			<svelte:fragment slot="helperText">* 5~20자 사이의 영문 소문자/숫자 입력</svelte:fragment>
		</LabelInput>

		<LabelInput type="password" name="password">
			<svelte:fragment slot="labelText">비밀번호</svelte:fragment>
			<svelte:fragment slot="icon"><i class="ri-lock-password-line" /></svelte:fragment>
			<svelte:fragment slot="helperText"
				>* 8~20자 사이, 영문/숫자/특수 문자 중 2가지 이상 포함</svelte:fragment
			>
		</LabelInput>

		<LabelInput type="password" name="confirm">
			<svelte:fragment slot="labelText">비밀번호 확인</svelte:fragment>
			<svelte:fragment slot="icon"><i class="ri-shield-check-line" /></svelte:fragment>
		</LabelInput>

		<LabelInput type="email" name="email">
			<svelte:fragment slot="labelText">이메일</svelte:fragment>
			<svelte:fragment slot="icon"><i class="ri-mail-line" /></svelte:fragment>
		</LabelInput>
	</div>

	<button class="w-full btn variant-filled-primary">회원가입</button>
</form>
