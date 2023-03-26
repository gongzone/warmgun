import { browser } from '$app/environment';
import { QueryClient } from '@tanstack/svelte-query';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			enabled: browser,
			retry: false,
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: false
		}
	}
});

export default queryClient;
