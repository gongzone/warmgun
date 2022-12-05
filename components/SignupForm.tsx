import LabelInput from './LabelInput'

export default function SignupForm() {
  return (
    <form className="flex flex-col gap-5">
      <LabelInput label="아이디" placeholder="5~20자 영문 소문자, 숫자 입력" />
      <LabelInput label="비밀번호" placeholder="8자 이상, 영문/숫자/특수문자 중 2가지 이상 입력" />
      <LabelInput label="비밀번호 확인" />
      <LabelInput label="이메일" />
    </form>
  )
}
