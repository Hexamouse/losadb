import { cn } from '@/lib/utils'

export default function Input({ className, value, setValue, placeholder }) {
  return (
    <input
      className={cn(
        'rounded-base bg-[#FEF2E8] border-2 border-[#374151] p-[10px] font-base ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 outline-none text-black',
        className,
      )}
      type="text"
      name="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        setValue(e.target.value)
      }}
      aria-label={placeholder}
    />
  )
}