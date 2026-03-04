interface ActionItem {
  text: string
  category: 'study' | 'apply' | 'explore'
}

interface Props {
  actions: ActionItem[]
}

const categoryLabel: Record<string, string> = {
  study: '학습',
  apply: '적용',
  explore: '탐색'
}

export default function ActionItems({ actions }: Props) {
  if (actions.length === 0) return null

  return (
    <div>
      <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#16a34a', marginBottom: '8px' }}>실무 적용 제안</h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {actions.map((action, i) => (
          <li key={i} style={{ fontSize: '16px', color: '#374151', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <span style={{
              fontSize: '14px',
              background: '#f3f4f6',
              color: '#6b7280',
              borderRadius: '4px',
              padding: '2px 6px',
              flexShrink: 0
            }}>
              {categoryLabel[action.category] || action.category}
            </span>
            <span>{action.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
