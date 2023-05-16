<script lang="ts">
	import { enhance } from '$app/forms';

	import UserIcon from '$lib/components/@icons/UserIcon.svelte';
	import PasswordIcon from '$lib/components/@icons/PasswordIcon.svelte';
	import CheckIcon from '$lib/components/@icons/CheckIcon.svelte';
	import EmailIcon from '$lib/components/@icons/EmailIcon.svelte';
	import FormInput from '$lib/components/@ui/FormInput.svelte';
</script>

<form method="POST" use:enhance>
	<div class="space-y-5 mb-8">
		<FormInput
			type="text"
			name="username"
			labelText="아이디"
			helperText="* 5~20자 사이의 영문 소문자/숫자 입력"
			placeholder="아이디를 입력하세요."
			icon={UserIcon}
		/>
		<FormInput
			type="password"
			name="password"
			labelText="비밀번호"
			helperText="* 8~20자 사이, 영문/숫자/특수 문자 중 2가지 이상 포함"
			placeholder="비밀번호를 입력하세요."
			icon={PasswordIcon}
		/>
		<FormInput
			type="password"
			name="confirm"
			labelText="비밀번호 확인"
			placeholder="앞선 비밀번호와 동일하게 작성하세요."
			icon={CheckIcon}
		/>
		<FormInput
			type="email"
			name="email"
			labelText="이메일"
			placeholder="이메일을 입력하세요."
			icon={EmailIcon}
		/>
	</div>

	<button type="submit" class="w-full btn variant-filled-primary">회원가입</button>
</form>
