import type { OutputData } from '@editorjs/editorjs';

export interface User {
	id: number;
	username: string;
	email: string;
	role: 'USER' | 'ADMIN';
	profile: {
		nickname: string;
		bio: string;
		avatar: string | null;
	};
	_count: {
		articles: number;
		followedBy: number;
		following: number;
	};
}

export interface Article {
	id: number;
	title: string;
	subTitle: string;
	body: OutputData;
	coverImage: string;
	slug: string;
	createdAt: Date;
	tags: {
		name: string;
	}[];
	author: {
		username: string;
		profile: {
			nickname: string;
			avatar: string | null;
			bio: string;
		};
	};
	_count: {
		likes: number;
		comments: number;
	};
}

export interface BlogerArticle extends Article {
	comments: Comment[];
	isLiked: boolean;
}

export interface Comment {
	id: number;
	content: string;
	createdAt: Date;
	updatedAt: Date;
	user: User;
	children: Comment[];
}
