interface Props {
  title: string
  selected: boolean
  onClick: () => void
}

export default function Tab({ title, selected, onClick }: Props) {
  return (
    <button onClick={onClick} className={`p-4 rounded-md ${selected ? 'bg-slate-700' : ''}`}>
      {title}
    </button>
  )
}
