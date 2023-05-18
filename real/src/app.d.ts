// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		user: import('$lib/types/user').CurrentUser;
	}
	interface PageData {
		user: import('$lib/types/user').CurrentUser;
		// drafts: import('$lib/types/draft').Draft[] | null;
	}
	// interface Error {}
	// interface Platform {}
}
