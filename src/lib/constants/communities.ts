export const communities = {
	FREE: {
		title: '자유'
	},
	QUESTION: {
		title: '질문'
	},
	DISCUSSION: {
		title: '토론'
	},
	TEAM: {
		title: '팀원'
	}
};

export type Community = keyof typeof communities;
