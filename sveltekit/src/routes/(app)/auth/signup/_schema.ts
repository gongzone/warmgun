import z from 'zod';

export const signupSchema = z
	.object({
		username: z
			.string({ required_error: '아이디는 필수 값 입니다.' })
			.regex(/^[A-Za-z]{1}[A-Za-z0-9]{4,19}$/, { message: '아이디 생성 규칙을 확인하세요.' }),
		password: z
			.string({ required_error: '비밀번호는 필수 값 입니다.' })
			.regex(
				/^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,20}$/,
				{
					message: '비밀번호 생성 규칙을 확인하세요.'
				}
			),
		confirm: z.string({ required_error: '비밀번호 확인은 필수 값 입니다.' }),
		email: z
			.string({ required_error: '이메일은 필수 값 입니다.' })
			.email({ message: '이메일 규칙에 따라 작성하여 주십시오.' })
	})
	.refine((data) => data.password === data.confirm, {
		message: '비밀번호가 일치하지 않습니다.',
		path: ['confirm']
	});
