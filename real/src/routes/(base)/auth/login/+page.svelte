<script lang="ts">
	import { enhance } from '$app/forms';

	import UserIcon from '$lib/components/@icons/UserIcon.svelte';
	import PasswordIcon from '$lib/components/@icons/PasswordIcon.svelte';
	import FormInput from '$lib/components/@ui/FormInput.svelte';
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
