import Input, { type Props as InputProps } from './Input'

interface Props extends InputProps {
  label: string
}

export default function LabelInput({ label, ...rest }: Props) {
  return (
    <div className="">
      <div className="flex flex-col gap-1">
        <label className={`text-zinc-300 ml-1`}>{label}</label>
        <Input {...rest} />
      </div>
    </div>
  )
}
