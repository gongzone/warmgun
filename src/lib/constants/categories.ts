export const categories = {
	FRONTEND: {
		title: '프론트엔드',
		slug: 'frontend'
	},
	BACKEND: {
		title: '백엔드',
		slug: 'backend'
	},
	DEVOPS: {
		title: '데브옵스',
		slug: 'devops'
	},
	MOBILE: {
		title: '모바일',
		slug: 'mobile'
	},
	DATA_SCIENCE: {
		title: '데이터 사이언스',
		slug: 'data-science'
	},
	GAME: {
		title: '게임',
		slug: 'game'
	},
	ETC: {
		title: '기타',
		slug: 'etc'
	}
};

export type Category = keyof typeof categories;
