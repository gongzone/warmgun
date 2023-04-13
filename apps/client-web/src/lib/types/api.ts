import type { OutputData } from '@editorjs/editorjs';

export interface User {
	id: number;
	username: string;
	email: string;
	role: 'USER' | 'ADMIN';
	createdAt: Date;
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

export interface Draft {
	id: number;
	title: string;
	subTitle: string;
	body: OutputData;
	createdAt: Date;
	updatedAt: Date;
}

export interface Article {
	id: number;
	title: string;
	subTitle: string;
	body: OutputData;
	coverImage: string;
	slug: string;
	createdAt: Date;
	tags: Tag[];
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

export interface PaginationData<T> {
	data: T[];
	nextCursor: number | undefined;
}

export interface BlogerArticle extends Article {
	isLiked: boolean;
	isOwner: boolean;
}

export interface Tag {
	id: number;
	name: string;
}

export interface Comment {
	id: number;
	content: string;
	createdAt: Date;
	updatedAt: Date;
	user: User;
	parentId: number | null;
	_count: {
		children: number;
	};
}
