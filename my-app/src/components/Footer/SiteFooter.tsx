import Link from "next/link"

import { siteConfig } from "@/config/site"

export function SiteFooter() {
  return (
    <footer className="container mt-40 border-t py-12">
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-7 lg:grid-cols-8">
        <div className="col-span-3 hidden sm:block">
          <span className="text-2xl font-bold">Warmgun</span>
          <div className="text-primary mt-2 flex flex-col">
            <span className="text-lg font-bold">For those</span>
            <span className="text-lg font-bold">
              who are tired of their daily lives
            </span>
          </div>
        </div>

        <div className="col-span-2">
          <span className="mb-4 text-2xl font-bold">Sites</span>
          <nav className="mt-2">
            <ul className="flex flex-col gap-3">
              {siteConfig.mainNav.map((nav, index) => (
                <li key={index} className="">
                  <span className="mr-2 ">•</span>
                  <Link
                    href={nav.href}
                    className="text-muted-foreground text-sm"
                  >
                    {nav.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="col-span-2">
          <span className="mb-4 text-2xl font-bold">Genre</span>
          <nav className="mt-2">
            <ul className="flex flex-col gap-3">
              {siteConfig.genre.map((nav, index) => (
                <li key={index} className="">
                  <span className="mr-2 ">•</span>
                  <Link
                    href={nav.href}
                    className="text-muted-foreground text-sm"
                  >
                    {nav.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="py-12">
        <span className="text-muted-foreground font-thin">
          Created By Gongzone
        </span>
      </div>
    </footer>
  )
}

{
  /* <footer class="px-[5vw]">
	<div class="grid grid-cols-8 border-t border-t-surface-500 py-12">
		<div class="col-span-3">
			<div class="">
				<h2 class="unstyled font-logo text-2xl md:text-4xl">Warmgun</h2>
			</div>
			<div class="flex flex-col text-primary-500 mt-2">
				<span class="text-xl font-bold">For those</span>
				<span class="text-xl font-bold">who are tired of their daily lives</span>
			</div>
			<div class="text-primary-500" />
		</div>

		<div class="col-span-2">
			<div class="text-lg font-bold mb-4">Site</div>
			<nav class="">
				<ul class="flex flex-col gap-4">
					{#each defaultLinks as defaultLink (defaultLink.name)}
						<li>
							<a class="unstyled flex items-center gap-2 text-surface-300" href={defaultLink.to}>
								<span>
									<svelte:component this={defaultLink.icon} class="w-[24px] h-[24px]" />
								</span>
								<span class="flex-auto">{defaultLink.name}</span>
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</div>

		<div class="col-span-2">
			<div class="text-lg font-bold mb-4">Community</div>
			<nav class="">
				<ul class="flex flex-col gap-4">
					<!-- {#each communities as community (community.name)}
						<li>
							<a class="unstyled flex items-center gap-2" href={community.to}>
								<span class="flex-auto text-surface-300">{community.name}</span>
							</a>
						</li>
					{/each} -->
				</ul>
			</nav>
		</div>
	</div>

	<div class="py-12">
		<span class="text-surface-300 font-thin">Created By Gongzone</span>
	</div>
</footer> */
}
