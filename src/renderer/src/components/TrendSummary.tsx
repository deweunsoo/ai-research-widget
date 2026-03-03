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
      <h2 className="text-sm font-semibold text-blue-400 mb-1.5">&#x1F4CC; 오늘의 핵심 트렌드</h2>
      <ul className="space-y-1">
        {trends.map((trend, i) => (
          <li key={i} className="text-sm text-gray-200 flex gap-2">
            <span className="text-gray-500">&bull;</span>
            <span>{trend.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
