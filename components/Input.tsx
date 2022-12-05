export interface Props extends React.HtmlHTMLAttributes<HTMLInputElement> {}

export default function Input(props: Props) {
  return (
    <div className="p-1 rounded-xl focus-within:bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
      <input
        className="text-[#111] font-bold text-lg px-4 border-2 border-zinc-600 rounded-xl h-14 border-b-2 
      outline-0 w-full focus:border-transparent placeholder:text-xs"
        {...props}
      />
    </div>
  )
}
