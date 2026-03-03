interface ActionItem {
  text: string
  category: 'study' | 'apply' | 'explore'
}

interface Props {
  actions: ActionItem[]
}

const categoryLabel: Record<string, string> = {
  study: '📖 학습',
  apply: '🛠 적용',
  explore: '🔍 탐색'
}

export default function ActionItems({ actions }: Props) {
  if (actions.length === 0) return null

  return (
    <div>
      <h2 className="text-sm font-semibold text-green-400 mb-1.5">🛠 실무 적용 제안</h2>
      <ul className="space-y-1.5">
        {actions.map((action, i) => (
          <li key={i} className="text-sm text-gray-200 flex gap-2 items-start">
            <span className="text-xs bg-white/10 rounded px-1.5 py-0.5 shrink-0">
              {categoryLabel[action.category] || action.category}
            </span>
            <span>{action.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
