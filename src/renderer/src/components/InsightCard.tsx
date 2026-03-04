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
      <h2 style={{ fontSize: '13px', fontWeight: 600, color: '#d97706', marginBottom: '6px' }}>&#x1F4A1; 인사이트</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
      style={{
        width: '100%',
        textAlign: 'left' as const,
        background: '#f9fafb',
        border: '1px solid #f3f4f6',
        borderRadius: '8px',
        padding: '12px',
        cursor: 'pointer'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ fontSize: '13px', fontWeight: 500, color: '#1f2937', margin: 0 }}>{insight.title}</h3>
        <span style={{ color: '#9ca3af', fontSize: '12px', marginLeft: '8px' }}>{expanded ? '▲' : '▼'}</span>
      </div>
      {expanded && (
        <div style={{ marginTop: '8px' }}>
          <p style={{ fontSize: '12px', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>{insight.body}</p>
          {insight.relatedUrls.length > 0 && (
            <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap' as const, gap: '4px' }}>
              {insight.relatedUrls.map((url, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '12px', color: '#3b82f6', textDecoration: 'none' }}
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
