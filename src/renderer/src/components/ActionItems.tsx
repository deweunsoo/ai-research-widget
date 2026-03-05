import BoldText from './BoldText'

interface ActionItem {
  text: string
  category: 'study' | 'apply' | 'explore'
}

interface Props {
  actions: ActionItem[]
  headline?: string
}

const categoryStyle: Record<string, { bg: string; color: string }> = {
  study: { bg: '#EBF5FF', color: '#3182F6' },
  apply: { bg: '#E8FAF0', color: '#1B9C5A' },
  explore: { bg: '#FFF3E0', color: '#D67200' }
}

const categoryLabel: Record<string, string> = {
  study: '학습',
  apply: '적용',
  explore: '탐색'
}

export default function ActionItems({ actions, headline }: Props) {
  if (actions.length === 0) return null

  return (
    <div>
      <h2 style={{ fontSize: '15px', fontWeight: 600, color: '#8B95A1', marginBottom: '6px', letterSpacing: '-0.2px' }}>실무 적용 제안</h2>
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
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {actions.map((action, i) => {
          const cs = categoryStyle[action.category] || { bg: '#F2F4F6', color: '#4E5968' }
          return (
            <li key={i} style={{
              fontSize: '20px',
              color: '#333D4B',
              lineHeight: 1.75,
              letterSpacing: '-0.3px',
              display: 'flex',
              gap: '10px',
              alignItems: 'flex-start',
              wordBreak: 'keep-all'
            }}>
              <span style={{
                fontSize: '13px',
                fontWeight: 600,
                background: cs.bg,
                color: cs.color,
                borderRadius: '6px',
                padding: '3px 10px',
                flexShrink: 0,
                marginTop: '3px',
                letterSpacing: '0px'
              }}>
                {categoryLabel[action.category] || action.category}
              </span>
              <span><BoldText text={action.text} /></span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
