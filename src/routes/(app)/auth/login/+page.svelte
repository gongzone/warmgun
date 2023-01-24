<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';

	import Alert from '$components/@custom/alert.svelte';

	export let form: ActionData;

	$: isVisible = !!form?.message;
	$: errorMessage = form?.message;
</script>

<form method="POST" use:enhance>
	<div class="flex flex-col gap-5 mb-8">
		<Alert {isVisible} {errorMessage} />

		<label for="username">
			<span>아이디</span>
			<input type="text" name="username" id="username" required />
		</label>

		<label for="password">
			<span>비밀번호</span>
			<input type="password" name="password" id="password" required />
		</label>
	</div>

	<button class="w-full btn btn-filled-primary btn-base">로그인</button>
</form>
