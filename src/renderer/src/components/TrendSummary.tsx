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
          lineHeight: 1.45,
          letterSpacing: '-0.5px',
          margin: '0 0 16px 0',
          wordBreak: 'keep-all'
        }}>{headline}</p>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {trends.map((trend, i) => (
          <div key={i}>
            <div>
              {trend.keywords && trend.keywords.length > 0 && (
                <div style={{ display: 'flex', gap: '6px', marginBottom: '10px', flexWrap: 'wrap' }}>
                  {trend.keywords.map((kw, j) => (
                    <span key={j} style={{
                      fontSize: '15px',
                      fontWeight: 500,
                      color: '#0084FE',
                      background: '#FFFFFF',
                      borderRadius: '8px',
                      padding: '4px 12px',
                      letterSpacing: '-0.2px'
                    }}>{kw}</span>
                  ))}
                </div>
              )}
              {(() => {
                const colonIdx = trend.text.indexOf(':')
                if (colonIdx === -1) return (
                  <p style={{ fontSize: '20px', color: '#333D4B', lineHeight: 1.75, letterSpacing: '-0.3px', wordBreak: 'keep-all', margin: 0 }}>
                    <BoldText text={trend.text} />
                  </p>
                )
                const title = trend.text.slice(0, colonIdx).replace(/\*\*/g, '')
                const body = trend.text.slice(colonIdx + 1).trim()
                return (
                  <>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#191F28', lineHeight: 1.5, letterSpacing: '-0.4px', margin: '0 0 4px 0', wordBreak: 'keep-all' }}>{title}</h3>
                    <p style={{ fontSize: '17px', color: '#4E5968', lineHeight: 1.75, letterSpacing: '-0.3px', wordBreak: 'keep-all', margin: 0 }}>
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
