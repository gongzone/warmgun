import { z } from 'zod';
import { communities, type Community } from '$lib/constants/communities';

const community = Object.keys(communities) as Array<Community>;
const [firstCommunity, ...otherCommunity] = community;

export const createPostSchema = z.object({
	title: z.string().min(1, '제목 작성은 필수입니다.'),
	body: z.string(),
	community: z.enum([firstCommunity, ...otherCommunity])
});
