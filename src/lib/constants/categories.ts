// export const categories = [
// 	{
// 		title: '프론트엔드',
// 		enum: 'FRONTEND',
// 		href: '/articles/trending/frontend',
// 		slug: 'frontend'
// 	},
// 	{
// 		title: '백엔드',
// 		enum: 'BACKEND',
// 		href: '/articles/trending/backend',
// 		slug: 'backend'
// 	},
// 	{
// 		title: '데브옵스',
// 		enum: 'DEVOPS',
// 		href: '/articles/trending/devops',
// 		slug: 'devops'
// 	},
// 	{
// 		title: '모바일',
// 		enum: 'MOBILE',
// 		href: '/articles/trending/mobile',
// 		slug: 'mobile'
// 	},
// 	{
// 		title: '데이터 사이언스',
// 		enum: 'DATA_SCIENCE',
// 		href: '/articles/trending/data_science',
// 		slug: 'data_science'
// 	},
// 	{
// 		title: '게임',
// 		enum: 'GAME',
// 		href: '/articles/trending/game',
// 		slug: 'game'
// 	},
// 	{
// 		title: '기타',
// 		enum: 'ETC',
// 		href: '/articles/trending/etc',
// 		slug: 'etc'
// 	}
// ];

export const categories = {
	FRONTEND: {
		title: '프론트엔드'
	},
	BACKEND: {
		title: '백엔드'
	},
	DEVOPS: {
		title: '데브옵스'
	},
	MOBILE: {
		title: '모바일'
	},
	DATA_SCIENCE: {
		title: '데이터 사이언스'
	},
	GAME: {
		title: '게임'
	},
	ETC: {
		title: '기타'
	}
};

export type Category = keyof typeof categories;
