import { ChartIcon } from './icons'

interface HeaderProps {
  currentDate: string
  generatedAt?: string
  onSettingsClick: () => void
  onRefresh: () => void
  loading: boolean
}

const SettingsIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.48.48 0 0 0-.48-.41h-3.84a.48.48 0 0 0-.48.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.49.49 0 0 0-.59.22L2.74 8.87a.48.48 0 0 0 .12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.26.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6A3.6 3.6 0 1 1 12 8.4a3.6 3.6 0 0 1 0 7.2z"/>
  </svg>
)

export default function Header({ onSettingsClick, onRefresh, loading }: HeaderProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#4ade80' }} />
        <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937', letterSpacing: '0.5px', margin: 0 }}>PRINGSEARCH</h1>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          className="header-icon-btn"
          onClick={onRefresh}
          disabled={loading}
          style={{ opacity: loading ? 0.5 : 1 }}
        >
          <ChartIcon />
        </button>
        <button
          className="header-icon-btn"
          onClick={onSettingsClick}
          style={{ color: 'var(--color-gray-8)' }}
          aria-label="Settings"
        >
          <SettingsIcon />
        </button>
      </div>
    </div>
  )
}
