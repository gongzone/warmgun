import { z } from 'zod';
import { categories, type Category } from '$lib/constants/categories';

const category = Object.keys(categories) as Array<Category>;
const [firstCategory, ...otherCategory] = category;

export const getArticlesSchema = z.object({
	category: z.enum(['ALL', firstCategory, ...otherCategory]).optional(),
	tagSlug: z.string().optional(),
	sort: z.enum(['trending', 'recent', 'best']),
	take: z.string({ required_error: '필수 값입니다.' }),
	cursor: z.string({ required_error: '필수 값입니다.' })
});

export const createArticleSchema = z.object({
	title: z.string().min(1, '제목 작성은 필수입니다.'),
	body: z.string(),
	plaintext: z.string(),
	coverImage: z.string().nullable(),
	tags: z.string().optional(),
	category: z.enum([firstCategory, ...otherCategory])
});
