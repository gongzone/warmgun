import { IsString, Matches, IsEmail } from 'class-validator';
import { Match } from 'src/lib/decorators/match';

export class SignupDTO {
  @IsString()
  @Matches(/^[A-Za-z]{1}[A-Za-z0-9]{4,19}$/, {
    message: '아이디 생성 규칙을 확인하세요.',
  })
  username: string;

  @IsString()
  @Matches(
    /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,20}$/,
    {
      message: '비밀번호 생성 규칙을 확인하세요.',
    },
  )
  password: string;

  @Match(SignupDTO, (o) => o.password, {
    message: '비밀번호가 동일하지 않습니다.',
  })
  confirm: string;

  @IsEmail({}, { message: '이메일 형식에 맞지 않습니다.' })
  email: string;
}
