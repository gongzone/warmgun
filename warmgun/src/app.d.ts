/// <reference types="@sveltejs/kit" />
/// <reference types="unplugin-icons/types/svelte" />

declare namespace App {
	interface Locals {
		user: import('$lib/types/user').CurrentUser;
	}
	interface PageData {
		user: import('$lib/types/user').CurrentUser;
	}
	// interface Error {}
	// interface Platform {}
}
