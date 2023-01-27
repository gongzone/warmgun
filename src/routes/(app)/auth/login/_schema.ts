import z from 'zod';

export const loginSchema = z.object({
	username: z.string({ required_error: '아이디는 필수 값 입니다.' }),
	password: z.string({ required_error: '비밀번호는 필수 값 입니다.' })
});
