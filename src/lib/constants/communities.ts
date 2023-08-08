export const communities = {
	FREE: {
		title: '자유',
		slug: 'free'
	},
	QUESTION: {
		title: '질문',
		slug: 'question'
	},
	DISCUSSION: {
		title: '토론',
		slug: 'discussion'
	},
	TEAM: {
		title: '팀원',
		slug: 'team'
	}
};

export type Community = keyof typeof communities;
