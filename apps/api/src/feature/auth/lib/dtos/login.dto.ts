import { IsString, IsNotEmpty } from 'class-validator';

class LoginDTO {
  @IsString()
  @IsNotEmpty({ message: '아이디를 입력해주세요.' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  password: string;
}

export default LoginDTO;
