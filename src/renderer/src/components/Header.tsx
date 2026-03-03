interface HeaderProps {
  currentDate: string
  generatedAt?: string
  onSettingsClick: () => void
  onRefresh: () => void
  loading: boolean
}

export default function Header({ currentDate, generatedAt, onSettingsClick, onRefresh, loading }: HeaderProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00')
    const days = ['일', '월', '화', '수', '목', '금', '토']
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')} (${days[date.getDay()]})`
  }

  const formatTime = (isoStr?: string) => {
    if (!isoStr) return ''
    const date = new Date(isoStr)
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
  }

  return (
    <div className="flex items-center justify-between mb-3">
      <div>
        <div className="flex items-center gap-2">
          <button
            onClick={onRefresh}
            disabled={loading}
            className={`text-sm ${loading ? 'animate-spin' : 'hover:opacity-70'} transition`}
          >
            &#x27F3;
          </button>
          <h1 className="text-base font-bold text-white">AI Research Daily</h1>
        </div>
        <p className="text-xs text-gray-400 mt-0.5">
          {formatDate(currentDate)}
          {generatedAt && ` ${formatTime(generatedAt)}`}
        </p>
      </div>
      <button
        onClick={onSettingsClick}
        className="text-gray-400 hover:text-white text-lg transition"
      >
        &#x2699;
      </button>
    </div>
  )
}
