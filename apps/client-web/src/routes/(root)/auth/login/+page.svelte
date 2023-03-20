<script lang="ts">
	import { createMutation, useQueryClient } from '@tanstack/svelte-query';
	import { goto } from '$app/navigation';
	import { HTTPError } from 'ky-universal';
	import UserIcon from '~icons/ri/user-line';
	import PasswordIcon from '~icons/ri/lock-password-line';

	import { login, type LoginDTO } from '$api/auth';
	import Alert from '$components/Message/Alert.svelte';
	import LabelInput from '$components/@base/Input/LabelInput.svelte';

	const queryClient = useQueryClient();

	const loginMutation = createMutation({
		mutationFn: (signupDTO: LoginDTO) => login(signupDTO),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['me'] });
			goto('/');
		}
	});

	const onSubmit = (e: any) => {
		const loginDTO = {
			username: e.target.username.value,
			password: e.target.password.value
		} satisfies LoginDTO;

		$loginMutation.mutate(loginDTO);
	};

	$: isVisible = $loginMutation.isError;
	$: errorMessage =
		isVisible && $loginMutation.error instanceof HTTPError
			? $loginMutation.error.message
			: '로그인 도중 문제가 발생하였습니다.';
</script>

<div class="mb-4">
	<Alert {isVisible} {errorMessage} />
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
