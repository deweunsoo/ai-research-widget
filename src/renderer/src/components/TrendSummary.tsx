interface TrendItem {
  text: string
  relatedUrls: string[]
}

interface Props {
  trends: TrendItem[]
}

export default function TrendSummary({ trends }: Props) {
  if (trends.length === 0) return null

  return (
    <div>
      <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#2563eb', marginBottom: '8px' }}>&#x1F4CC; 오늘의 핵심 트렌드</h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {trends.map((trend, i) => (
          <li key={i} style={{ fontSize: '16px', color: '#374151', display: 'flex', gap: '8px' }}>
            <span style={{ color: '#9ca3af' }}>&bull;</span>
            <span>{trend.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
