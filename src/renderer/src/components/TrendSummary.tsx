import BoldText from './BoldText'

interface TrendItem {
  keywords?: string[]
  text: string
  relatedUrls: string[]
}

interface Props {
  trends: TrendItem[]
  headline?: string
}

export default function TrendSummary({ trends, headline }: Props) {
  if (trends.length === 0) return null

  return (
    <div>
      <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#8B95A1', marginBottom: '6px', letterSpacing: '-0.2px' }}>핵심 트렌드</h2>
      {headline && (
        <p style={{
          fontSize: '24px',
          fontWeight: 700,
          color: '#191F28',
          lineHeight: 1.4,
          letterSpacing: '0em',
          margin: '0 0 16px 0',
          wordBreak: 'keep-all'
        }}>{headline}</p>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {trends.map((trend, i) => (
          <div
            key={i}
            className="trend-item"
            onClick={() => trend.relatedUrls?.[0] && window.open(trend.relatedUrls[0], '_blank')}
            style={{ cursor: trend.relatedUrls?.[0] ? 'pointer' : 'default' }}
          >
            <div>
              {trend.keywords && trend.keywords.length > 0 && (
                <div style={{ display: 'flex', gap: '6px', marginBottom: '10px', flexWrap: 'wrap' }}>
                  {trend.keywords.map((kw, j) => (
                    <span key={j} className="keyword-tag" style={{
                      fontSize: '13px',
                      fontWeight: 500,
                      color: '#0084FE',
                      background: '#FFFFFF',
                      border: '1px solid #A8CFFF',
                      borderRadius: '6px',
                      padding: '3px 10px',
                      letterSpacing: '0em'
                    }}>{kw}</span>
                  ))}
                </div>
              )}
              {(() => {
                const colonIdx = trend.text.indexOf(':')
                if (colonIdx === -1) return (
                  <p style={{ fontSize: '17px', color: '#333D4B', lineHeight: 1.6, letterSpacing: '0em', wordBreak: 'keep-all', margin: 0 }}>
                    <BoldText text={trend.text} />
                  </p>
                )
                const title = trend.text.slice(0, colonIdx).replace(/\*\*/g, '')
                const body = trend.text.slice(colonIdx + 1).trim()
                return (
                  <>
                    <h3 style={{ fontSize: '19px', fontWeight: 700, color: '#333D4B', lineHeight: 1.6, letterSpacing: '0em', margin: '0 0 4px 0', wordBreak: 'keep-all' }}>{title}</h3>
                    <p style={{ fontSize: '17px', color: '#4E5968', lineHeight: 1.6, letterSpacing: '0em', wordBreak: 'keep-all', margin: 0 }}>
                      <BoldText text={body} />
                    </p>
                  </>
                )
              })()}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
