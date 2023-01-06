<script lang="ts">
  import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { Alert } from '@skeletonlabs/skeleton';

  export let form: ActionData;
</script>

<form method="POST" use:enhance>
  <div class="flex flex-col gap-5 mb-8" >
    <Alert visible={!!form?.message}>
      <svelte:fragment slot="lead"><span class="text-4xl">⚠️</span></svelte:fragment>
      <svelte:fragment slot="title"><h3 class="text-xl font-bold">오, 이럴수가!</h3></svelte:fragment>
      <span>{form?.message}</span>
    </Alert>

    <label for="username">
      <span>아이디</span>
      <input type="text" name="username" id="username" required>
    </label>
  
    <label for="password">
      <span>비밀번호</span>
      <input type="password" name="password" id="password" required>
    </label>
  </div>

  <button class="w-full btn btn-filled-primary btn-base">로그인</button>
</form>