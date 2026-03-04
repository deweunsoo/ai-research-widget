import { ChartIcon } from './icons'

interface HeaderProps {
  currentDate: string
  generatedAt?: string
  onSettingsClick: () => void
  onRefresh: () => void
  loading: boolean
}

export default function Header({ onSettingsClick, onRefresh, loading }: HeaderProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#4ade80' }} />
        <h1 style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', letterSpacing: '0.5px', margin: 0 }}>PRINGSEARCH</h1>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={onRefresh}
          disabled={loading}
          style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: loading ? 0.5 : 1, padding: 0 }}
        >
          <ChartIcon />
        </button>
        <button
          onClick={onSettingsClick}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', fontSize: '18px', padding: 0 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
