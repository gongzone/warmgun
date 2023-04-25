<script lang="ts">
	import UserIcon from '~icons/ri/user-line';
	import PasswordIcon from '~icons/ri/lock-password-line';
	import CheckIcon from '~icons/ri/shield-check-line';
	import EmailIcon from '~icons/ri/mail-line';

	import FormInput from '$components/FormInput.svelte';
</script>

<form>
	<div class="space-y-5 mb-8">
		<FormInput
			type="text"
			name="username"
			labelText="아이디"
			helperText="* 5~20자 사이의 영문 소문자/숫자 입력"
			placeholder="아이디를 입력하세요."
		>
			<svelte:fragment slot="icon"><UserIcon /></svelte:fragment>
		</FormInput>
		<FormInput
			type="password"
			name="password"
			labelText="비밀번호"
			helperText="* 8~20자 사이, 영문/숫자/특수 문자 중 2가지 이상 포함"
			placeholder="비밀번호를 입력하세요."
		>
			<svelte:fragment slot="icon"><PasswordIcon /></svelte:fragment>
		</FormInput>
		<FormInput
			type="password"
			name="confirm"
			labelText="비밀번호 확인"
			placeholder="앞선 비밀번호와 동일하게 작성하세요."
		>
			<svelte:fragment slot="icon"><CheckIcon /></svelte:fragment>
		</FormInput>
		<FormInput type="email" name="email" labelText="이메일" placeholder="이메일을 입력하세요.">
			<svelte:fragment slot="icon"><EmailIcon /></svelte:fragment>
		</FormInput>
	</div>

	<button type="submit" class="w-full btn variant-filled-primary">회원가입</button>
</form>
