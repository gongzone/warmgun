import z from 'zod'

export const signupSchema = z.object({
  username: z
    .string()
    .regex(/^[A-Za-z]{1}[A-Za-z0-9]{4,19}$/, '아이디 생성 규칙에 따라 작성해주세요.'),
  password: z
    .string()
    .regex(
      /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,20}$/,
      '비밀번호 생성 규칙에 따라 작성해주세요.',
    ),
  confirmPassword: z.string().trim().min(1, '비밀번호 확인은 필수 값 입니다.'),
  email: z.string().email('이메일 형식에 따라 작성해주세요.'),
})
