<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_HOST } from '$env/static/public';

	import { metaDefaults } from '$lib/configs/meta';

	export let title: string | undefined = undefined;
	export let description: string | undefined = metaDefaults.description;
	export let image: string | undefined | null = metaDefaults.image;
	export let keywords: string | undefined =
		'개발, 커뮤니티, 블로그, 웹, development, community, blog, web';
	export let author: string | undefined = 'gongzone';
	export let article:
		| {
				author: string | undefined;
				publishTime: Date;
				modifiedTime: Date;
		  }
		| undefined = undefined;

	$: {
		title = title ? `${title} - ${metaDefaults.title}` : metaDefaults.title;
		image = image ? image : metaDefaults.image;
	}
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords} />
	<meta name="author" content={author} />

	<meta property="og:site_name" content={metaDefaults.title} />
	<meta property="og:type" content={article ? 'article' : 'website'} />
	<meta property="og:url" content="{PUBLIC_HOST}{$page.url.pathname}" />
	<meta property="og:locale" content="ko_KR" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:image:secure_url" content={image} />

	{#if article}
		<meta property="article:author" content={article.author} />
		<meta property="article:published_time" content={article.publishTime.toISOString()} />
		<meta property="article:modified_time" content={article.modifiedTime.toISOString()} />
	{/if}

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={metaDefaults.title} />
	<meta name="twitter:creator" content={author} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
</svelte:head>
