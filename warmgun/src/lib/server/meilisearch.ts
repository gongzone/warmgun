import { MeiliSearch } from 'meilisearch';
import { MEILISEARCH_HOST, MEILISEARCH_MASTER_KEY } from '$env/static/private';

export const meilisearchClient = new MeiliSearch({
	host: MEILISEARCH_HOST,
	apiKey: MEILISEARCH_MASTER_KEY
});
