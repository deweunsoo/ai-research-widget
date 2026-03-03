interface Props {
  currentDate: string
  onDateChange: (date: string) => void
}

export default function DateNav({ currentDate, onDateChange }: Props) {
  const navigate = (days: number) => {
    const date = new Date(currentDate + 'T00:00:00')
    date.setDate(date.getDate() + days)
    onDateChange(date.toISOString().split('T')[0])
  }

  return (
    <div className="flex items-center justify-between pt-2 border-t border-white/10">
      <button
        onClick={() => navigate(-1)}
        className="text-xs text-gray-400 hover:text-white transition px-2 py-1"
      >
        ◀ 어제
      </button>
      <button
        onClick={() => onDateChange(new Date().toISOString().split('T')[0])}
        className="text-xs text-gray-400 hover:text-white transition px-2 py-1"
      >
        📚 오늘
      </button>
      <button
        onClick={() => navigate(1)}
        className="text-xs text-gray-400 hover:text-white transition px-2 py-1"
      >
        내일 ▶
      </button>
    </div>
  )
}
