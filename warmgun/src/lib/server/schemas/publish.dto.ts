import z from 'zod';

export const publishSchema = z.object({
	title: z.string().min(1, '제목 작성은 필수입니다.'),
	subTitle: z.string().min(1, '소제목 작성은 필수입니다.'),
	body: z.string(),
	coverImage: z.string().optional(),
	tags: z.string()
});
