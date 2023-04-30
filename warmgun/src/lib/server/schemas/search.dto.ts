import z from 'zod';

export const searchDto = z.object({
	q: z.string({ required_error: '필수 값입니다.' }),
	mode: z.enum(['tags']),
	take: z.string({ required_error: '필수 값입니다.' }),
	cursor: z.string({ required_error: '필수 값입니다.' })
});
