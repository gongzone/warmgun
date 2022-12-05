import LabelInput from './LabelInput'

export default function LoginForm() {
  return (
    <form className="flex flex-col gap-5">
      <LabelInput label="아이디" />
      <LabelInput label="비밀번호" />
    </form>
  )
}
