import { useState } from 'react'
import BoldText from './BoldText'

interface InsightItem {
  title: string
  body: string
  relatedUrls: string[]
}

interface Props {
  insights: InsightItem[]
  headline?: string
}

export default function InsightCards({ insights, headline }: Props) {
  if (insights.length === 0) return null

  return (
    <div>
      <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#8B95A1', marginBottom: '6px', letterSpacing: '-0.2px' }}>인사이트</h2>
      {headline && (
        <p style={{
          fontSize: '24px',
          fontWeight: 700,
          color: '#191F28',
          lineHeight: 1.45,
          letterSpacing: '-0.5px',
          margin: '0 0 16px 0',
          wordBreak: 'keep-all'
        }}>{headline}</p>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
    <div style={{
      background: '#ECEEF0',
      border: '1px solid #DDE0E4',
      borderRadius: '12px',
      padding: '16px'
    }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 600,
            color: '#4E5968',
            margin: 0,
            lineHeight: 1.6,
            letterSpacing: '-0.3px'
          }}><BoldText text={insight.title} color="#4E5968" /></h3>
          <span style={{ color: '#8B95A1', fontSize: '13px', marginLeft: '12px', flexShrink: 0 }}>{expanded ? '▲' : '▼'}</span>
        </div>
      </button>
      {expanded && (
        <div style={{ marginTop: '12px' }}>
          <p style={{
            fontSize: '19px',
            color: '#4E5968',
            lineHeight: 1.8,
            margin: 0,
            letterSpacing: '-0.3px',
            wordBreak: 'keep-all'
          }}><BoldText text={insight.body} color="#333D4B" /></p>
          {insight.relatedUrls.length > 0 && (
            <div style={{ marginTop: '14px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {insight.relatedUrls.map((url, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '14px', color: '#3182F6', textDecoration: 'none', fontWeight: 500 }}
                >
                  [{i + 1}] 원문
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
