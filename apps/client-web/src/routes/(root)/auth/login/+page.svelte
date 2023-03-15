<script lang="ts">
	import { createMutation } from '@tanstack/svelte-query';
	import { HTTPError } from 'ky-universal';
	import UserIcon from '~icons/ri/user-line';
	import PasswordIcon from '~icons/ri/lock-password-line';

	import { login, type LoginDTO } from '$api/auth';
	import FormAlert from '$components/Alert/FormAlert.svelte';
	import LabelInput from '$components/@base/Input/LabelInput.svelte';

	const mutation = createMutation({
		mutationFn: (signupDTO: LoginDTO) => login(signupDTO)
	});

	const onSubmit = (e: any) => {
		const loginDTO = {
			username: e.target.username.value,
			password: e.target.password.value
		} satisfies LoginDTO;

		$mutation.mutate(loginDTO);
	};

	$: isVisible = $mutation.isError;
	$: errorMessage =
		isVisible && $mutation.error instanceof HTTPError
			? $mutation.error.message
			: '로그인 도중 문제가 발생하였습니다.';
</script>

<div class="mb-4">
	<FormAlert {isVisible} {errorMessage} />
</div>

<form on:submit|preventDefault={onSubmit}>
	<div class="space-y-5 mb-8">
		<LabelInput type="text" name="username">
			<svelte:fragment slot="labelText">아이디</svelte:fragment>
			<svelte:fragment slot="icon"><UserIcon /></svelte:fragment>
		</LabelInput>

		<LabelInput type="password" name="password">
			<svelte:fragment slot="labelText">비밀번호</svelte:fragment>
			<svelte:fragment slot="icon"><PasswordIcon /></svelte:fragment>
		</LabelInput>
	</div>

	<button type="submit" class="w-full btn variant-filled-primary">로그인</button>
</form>
