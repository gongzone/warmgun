<script lang="ts">
  import { writable, get, type Writable } from 'svelte/store';
  import { page } from '$app/stores';
  import { AppShell, AppBar, AppRail, AppRailTile, ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
  import HeaderLead from '$components/header-lead.svelte';

  const railStore: Writable<string> = writable("item");

  $: classesActive = (href: string) => (href === $page.url.pathname ? '!bg-primary-active-token' : '');
</script>

<AppShell slotPageContent="p-5">
	<svelte:fragment slot="header">
    <AppBar padding="px-[5vw] py-4">
      <svelte:fragment slot="lead">
        <HeaderLead description={'dnjsqhwo 관리자님 환영합니다.'}/>
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
    <div class="flex">
      <AppRail background="bg-black/30" selected={railStore}>
          <AppRailTile label="아이템" value="item">📃</AppRailTile>
          <AppRailTile label="유저" value="user">(icon)</AppRailTile>
      </AppRail>
      <nav class="p-4 overflow-y-auto min-w-[260px]">
        {#if $railStore === 'item'}
          <nav class="list-nav">
            <ul>
              <li>
                <a href="/admin/avatar" class={classesActive('/admin/avatar')}>아바타</a>
              </li>
              <li>
                <a href="/admin/title" class={classesActive('/admin/title')}>타이틀</a>
              </li>
            </ul>
          </nav>
        {/if}
      </nav>
    </div>
  </svelte:fragment>
	<!-- Router Slot -->
  <slot />
	<!-- ---- / ---- -->
</AppShell>