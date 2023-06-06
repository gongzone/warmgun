<script lang="ts">
	import '../theme.postcss';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';

	import { PUBLIC_CDN_DOMAIN } from '$env/static/public';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	import Toast from '$components/@ui/Toast/Toast.svelte';
	import Drawer from '$components/@ui/Drawer/Drawer.svelte';
	import Modal from '$components/@ui/Modal/Modal.svelte';

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser,
				retry: false,
				refetchOnWindowFocus: false,
				refetchOnMount: true
			}
		}
	});

	const metaDefaults = {
		title: 'Warmgun',
		description:
			'Warmgun은 개발 커뮤니티와 블로그 서비스 기능을 제공하는 웹 플랫폼입니다. 좋은 퀄리티의 글쓰기를 지향하며, 개발자들의 성장을 주요 목표로 삼습니다.',
		image: `${PUBLIC_CDN_DOMAIN}/static/meta-image.png`
	};

	const meta = {
		title: metaDefaults.title,
		description: metaDefaults.description,
		image: metaDefaults.image,
		// Article
		article: { publishTime: '', modifiedTime: '', author: '' },
		// Twitter
		twitter: {
			title: metaDefaults.title,
			description: metaDefaults.description,
			image: metaDefaults.image
		}
	};

	let isBlogArticle: boolean = false;

	page.subscribe((page) => {
		meta.title = metaDefaults.title;
		meta.description = metaDefaults.description;
		meta.image = metaDefaults.image;

		meta.twitter.title = metaDefaults.title;
		meta.twitter.description = metaDefaults.description;
		meta.twitter.image = metaDefaults.image;

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

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<svelte:head>
	<title>{meta.title}</title>
	<!-- Meta Tags -->
	<meta name="title" content={meta.title} />
	<meta name="description" content={meta.description} />
	<meta name="keywords" content="개발, 커뮤니티, 블로그, 웹, development, community, blog, web" />
	<meta name="theme-color" content="#d6d143" />
	<meta name="author" content="gongzone" />
	<!-- Open Graph - https://ogp.me/ -->
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
	<!-- OG: Article -->
	{#if isBlogArticle}
		<meta property="article:published_time" content={meta.article.publishTime} />
		<meta property="article:modified_time" content={meta.article.modifiedTime} />
		<meta property="article:author" content={meta.article.author} />
	{/if}
	<!-- Open Graph: Twitter -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content="Warmgun" />
	<meta name="twitter:creator" content="gongzone" />
	<meta name="twitter:title" content={meta.twitter.title} />
	<meta name="twitter:description" content={meta.twitter.description} />
	<meta name="twitter:image" content={meta.twitter.image} />
</svelte:head>

<QueryClientProvider client={queryClient}>
	<Toast />
	<Drawer />
	<Modal />
	<slot />
</QueryClientProvider>
