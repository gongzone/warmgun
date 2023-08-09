import { z } from 'zod';
import { communities, type Community } from '$lib/constants/communities';

const community = Object.keys(communities) as Array<Community>;
const [firstCommunity, ...otherCommunity] = community;

export const getPostSchema = z.object({
	sort: z.enum(['trending', 'recent']),
	take: z.string({ required_error: '필수 값입니다.' }),
	cursor: z.string({ required_error: '필수 값입니다.' })
});

export const createPostSchema = z.object({
	postId: z.string().optional(),
	title: z.string().min(1, '제목 작성은 필수입니다.'),
	body: z.string(),
	community: z.enum([firstCommunity, ...otherCommunity])
});
