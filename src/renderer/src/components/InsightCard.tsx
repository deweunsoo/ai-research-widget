import { useState } from 'react'

interface InsightItem {
  title: string
  body: string
  relatedUrls: string[]
}

interface Props {
  insights: InsightItem[]
}

export default function InsightCards({ insights }: Props) {
  if (insights.length === 0) return null

  return (
    <div>
      <h2 className="text-sm font-semibold text-yellow-400 mb-1.5">&#x1F4A1; 인사이트</h2>
      <div className="space-y-2">
        {insights.map((insight, i) => (
          <InsightCardItem key={i} insight={insight} />
        ))}
      </div>
    </div>
  )
}

function InsightCardItem({ insight }: { insight: InsightItem }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <button
      onClick={() => setExpanded(!expanded)}
      className="w-full text-left bg-white/5 rounded-lg p-3 hover:bg-white/10 transition"
    >
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium text-gray-100">{insight.title}</h3>
        <span className="text-gray-500 text-xs ml-2">{expanded ? '▲' : '▼'}</span>
      </div>
      {expanded && (
        <div className="mt-2">
          <p className="text-xs text-gray-300 leading-relaxed">{insight.body}</p>
          {insight.relatedUrls.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {insight.relatedUrls.map((url, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 hover:underline"
                  onClick={e => e.stopPropagation()}
                >
                  [{i + 1}] 원문
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </button>
  )
}
