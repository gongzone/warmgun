<script lang="ts">
	import { page } from '$app/stores';
	import { metaDefaults } from '$lib/configs/meta';

	let isBlogArticle: boolean = false;

	const meta = {
		title: metaDefaults.title,
		description: metaDefaults.description,
		image: metaDefaults.image,
		twitter: {
			title: metaDefaults.title,
			description: metaDefaults.description,
			image: metaDefaults.image
		},
		article: { publishTime: '', modifiedTime: '', author: '' }
	};

	page.subscribe((page) => {
		const blogUser = page.data.blogUser;
		isBlogArticle = !!page.data.article;

		if (blogUser) {
			meta.title = `${blogUser.profile?.nickname} — Warmgun`;
			meta.description = `${blogUser.profile?.bio}`;
			meta.image = blogUser.profile?.blogImage ?? metaDefaults.image;

			meta.twitter.title = `${blogUser.profile?.nickname} — Warmgun`;
			meta.twitter.description = `${blogUser.profile?.bio}`;
			meta.twitter.image = blogUser.profile?.blogImage ?? metaDefaults.image;
		}

		if (isBlogArticle) {
			const article = page.data.article;

			meta.article.publishTime = article.createdAt.toISOString();
			meta.article.modifiedTime = article.updatedAt.toISOString();
			meta.article.author = article.author.profile?.nickname;
		}
	});
</script>

<svelte:head>
	<title>{meta.title}</title>
	<!-- Meta Tags -->
	<meta name="title" content={meta.title} />
	<meta name="description" content={meta.description} />
	<meta name="keywords" content="개발, 커뮤니티, 블로그, 웹, development, community, blog, web" />
	<meta name="theme-color" content="#d6d143" />
	<meta name="author" content="gongzone" />
	<!-- Open Graph -->
	<meta property="og:site_name" content="Warmgun" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://www.skeleton.dev{$page.url.pathname}" />
	<meta property="og:locale" content="ko_KR" />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:image" content={meta.image} />
	<meta property="og:image:secure_url" content={meta.image} />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<!-- Open Graph: Twitter -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content="Warmgun" />
	<meta name="twitter:creator" content="gongzone" />
	<meta name="twitter:title" content={meta.twitter.title} />
	<meta name="twitter:description" content={meta.twitter.description} />
	<meta name="twitter:image" content={meta.twitter.image} />
	<!-- Open Graph: Article -->
	{#if isBlogArticle}
		<meta property="article:published_time" content={meta.article.publishTime} />
		<meta property="article:modified_time" content={meta.article.modifiedTime} />
		<meta property="article:author" content={meta.article.author} />
	{/if}
</svelte:head>
