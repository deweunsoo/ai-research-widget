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

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00')
    const days = ['일', '월', '화', '수', '목', '금', '토']
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')} (${days[date.getDay()]})`
  }

  return (
    <div style={{ marginTop: 'auto', paddingTop: '8px' }}>
      <p style={{ textAlign: 'center', fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>{formatDate(currentDate)}</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #e5e7eb', paddingTop: '8px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ fontSize: '12px', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px' }}
        >
          ◀ 어제
        </button>
        <button
          onClick={() => onDateChange(new Date().toISOString().split('T')[0])}
          style={{ fontSize: '12px', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px' }}
        >
          오늘
        </button>
        <button
          onClick={() => navigate(1)}
          style={{ fontSize: '12px', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px' }}
        >
          내일 ▶
        </button>
      </div>
    </div>
  )
}
