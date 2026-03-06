function toLocalDateStr(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

interface Props {
  currentDate: string
  onDateChange: (date: string) => void
}

export default function DateNav({ currentDate, onDateChange }: Props) {
  const navigate = (days: number) => {
    const date = new Date(currentDate + 'T00:00:00')
    date.setDate(date.getDate() + days)
    onDateChange(toLocalDateStr(date))
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00')
    const days = ['일', '월', '화', '수', '목', '금', '토']
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')} (${days[date.getDay()]})`
  }

  const getLabel = (days: number): string => {
    const today = toLocalDateStr(new Date())
    const target = new Date(currentDate + 'T00:00:00')
    target.setDate(target.getDate() + days)
    const targetStr = toLocalDateStr(target)
    if (targetStr === today) return '오늘'
    const diff = Math.round((target.getTime() - new Date(today + 'T00:00:00').getTime()) / 86400000)
    if (diff === -1) return '어제'
    if (diff === 1) return '내일'
    return `${target.getMonth() + 1}/${target.getDate()}`
  }

  const isToday = currentDate === toLocalDateStr(new Date())

  return (
    <div style={{ marginTop: 'auto', paddingTop: '8px' }}>
      <p style={{ textAlign: 'center', fontSize: '15px', color: '#9ca3af', marginBottom: '8px' }}>{formatDate(currentDate)}</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #e5e7eb', paddingTop: '8px', position: 'relative' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ fontSize: '15px', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px' }}
        >
          ◀ {getLabel(-1)}
        </button>
        <button
          onClick={() => onDateChange(toLocalDateStr(new Date()))}
          style={{ fontSize: '15px', color: isToday ? '#6b7280' : '#3182F6', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px', fontWeight: isToday ? 400 : 600, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}
        >
          오늘
        </button>
        <button
          onClick={() => !isToday && navigate(1)}
          disabled={isToday}
          style={{ fontSize: '15px', color: isToday ? '#D1D6DB' : '#6b7280', background: 'none', border: 'none', cursor: isToday ? 'default' : 'pointer', padding: '4px 8px' }}
        >
          {isToday ? '' : `${getLabel(1)} ▶`}
        </button>
      </div>
    </div>
  )
}
