<script lang="ts">
	import { createMutation, useQueryClient } from '@tanstack/svelte-query';
	import { goto } from '$app/navigation';
	import { HTTPError } from 'ky-universal';
	import UserIcon from '~icons/ri/user-line';
	import PasswordIcon from '~icons/ri/lock-password-line';
	import CheckIcon from '~icons/ri/shield-check-line';
	import EmailIcon from '~icons/ri/mail-line';

	import { signup, type SignupDTO } from '$api/auth';
	import Alert from '$components/Message/Alert.svelte';
	import LabelInput from '$components/@base/Input/LabelInput.svelte';

	const queryClient = useQueryClient();

	const mutation = createMutation({
		mutationFn: (signupDTO: SignupDTO) => signup(signupDTO),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['me'] });
			queryClient.invalidateQueries({ queryKey: ['myDrafts'] });
			goto('/');
		}
	});

	const onSubmit = (e: any) => {
		const signupDTO = {
			username: e.target.username.value,
			password: e.target.password.value,
			confirm: e.target.confirm.value,
			email: e.target.email.value
		} satisfies SignupDTO;

		$mutation.mutate(signupDTO);
	};

	$: isVisible = $mutation.isError;
	$: errorMessage =
		isVisible && $mutation.error instanceof HTTPError
			? $mutation.error.message
			: '회원가입 도중 문제가 발생하였습니다.';
</script>

<div class="mb-4">
	<Alert {isVisible} {errorMessage} />
</div>

<form on:submit|preventDefault={onSubmit}>
	<div class="space-y-5 mb-8">
		<LabelInput type="text" name="username">
			<svelte:fragment slot="labelText">아이디</svelte:fragment>
			<svelte:fragment slot="icon"><UserIcon /></svelte:fragment>
			<svelte:fragment slot="helperText">* 5~20자 사이의 영문 소문자/숫자 입력</svelte:fragment>
		</LabelInput>

		<LabelInput type="password" name="password">
			<svelte:fragment slot="labelText">비밀번호</svelte:fragment>
			<svelte:fragment slot="icon"><PasswordIcon /></svelte:fragment>
			<svelte:fragment slot="helperText"
				>* 8~20자 사이, 영문/숫자/특수 문자 중 2가지 이상 포함</svelte:fragment
			>
		</LabelInput>

		<LabelInput type="password" name="confirm">
			<svelte:fragment slot="labelText">비밀번호 확인</svelte:fragment>
			<svelte:fragment slot="icon"><CheckIcon /></svelte:fragment>
		</LabelInput>

		<LabelInput type="email" name="email">
			<svelte:fragment slot="labelText">이메일</svelte:fragment>
			<svelte:fragment slot="icon"><EmailIcon /></svelte:fragment>
		</LabelInput>
	</div>

	<button type="submit" class="w-full btn variant-filled-primary">회원가입</button>
</form>
