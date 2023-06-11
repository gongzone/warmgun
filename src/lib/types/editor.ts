import type { OutputData } from '@editorjs/editorjs';
import type { Genre } from '@prisma/client';

export interface CurrentEditorData {
	title: string;
	body: OutputData;
}

export interface ArticleMeta {
	coverImage: string | null;
	tags: string[];
	genre: Genre;
}
