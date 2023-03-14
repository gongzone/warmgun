<script lang="ts">
	import UserIcon from '~icons/ri/user-line';
	import PasswordIcon from '~icons/ri/lock-password-line';
	import CheckIcon from '~icons/ri/shield-check-line';
	import EmailIcon from '~icons/ri/mail-line';

	import LabelInput from '$components/@base/Input/LabelInput.svelte';
</script>

<form>
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
