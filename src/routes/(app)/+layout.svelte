<script lang="ts">
  import type { LayoutData } from './$types';
  import { AppBar, Avatar, menu } from '@skeletonlabs/skeleton'; 

  import HeaderLead from '$components/header-lead.svelte'
  import Hamburger from '$components/@svg/hamburger.svelte';
  import DefaultAvatar from '$components/@svg/default-avatar.svelte';

  export let data: LayoutData;

  $: user = data.user
</script>

<AppBar padding="px-[5vw] py-9 md:py-12">
	<svelte:fragment slot="lead">
    <HeaderLead description="개발 커뮤니티 & 블로그 서비스"/>
	</svelte:fragment>

	<svelte:fragment slot="trail">
		<button class="btn-icon btn-ringed w-12 px-0 ring-[1.5px] dark:ring-zinc-500 hover:dark:ring-gray-400">
			<Hamburger />
		</button>

		<div class="relative">
			<button 
				use:menu={{ menu: 'example' }} 
				class={`btn-icon w-12 px-0 ${!user ? 'btn-ringed ring-[1.5px] dark:ring-zinc-500 hover:dark:ring-gray-400' : ''}`}
			>
        {#if !user}
          <DefaultAvatar />
        {:else}
          <Avatar />
        {/if}
			</button>

      <nav class="list-nav card p-4 w-64 shadow-xl" data-menu="example">
        <ul>
          {#if !user}
            <li><a href="/auth/login">로그인</a></li>
            <li><a href="/auth/signup">회원가입</a></li>
          {:else}
            {#if user.role === 'ADMIN'}
              <li>
                <a href="/admin">⚙️ 관리자 페이지</a>
              </li>
            {/if}
            <li>
              <a href="/">내 블로그</a>
            </li>
            <li>
              <form method="POST" action="/auth/logout">
                <button class="option w-full">로그아웃</button>
              </form>
            </li>
          {/if}
        </ul>
      </nav>
		</div>
	</svelte:fragment>
</AppBar>

<main class="px-[5vw] py-4 md:py-8"><slot /></main>

<div>Footer</div>



