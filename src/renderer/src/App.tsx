import { useState } from 'react'
import Header from './components/Header'
import TrendSummary from './components/TrendSummary'
import InsightCards from './components/InsightCard'
import ActionItems from './components/ActionItems'
import DateNav from './components/DateNav'
import Settings from './components/Settings'
import { useResearch } from './hooks/useResearch'
import { CatIcon, CaterpillarIcon, DocListIcon } from './components/icons'

export default function App() {
  const { research, loading, currentDate, loadResearch, runNow } = useResearch()
  const [showSettings, setShowSettings] = useState(false)

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        borderRadius: '16px',
        background: '#ffffff',
        color: '#1f2937',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid #e5e7eb',
        boxSizing: 'border-box',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}
    >
      {showSettings ? (
        <Settings onBack={() => setShowSettings(false)} onRunNow={runNow} />
      ) : (
        <>
          <Header
            currentDate={currentDate}
            generatedAt={research?.generatedAt}
            onSettingsClick={() => setShowSettings(true)}
            onRefresh={runNow}
            loading={loading}
          />

          <div style={{ flex: 1, overflowY: 'auto', paddingRight: '4px' }}>
            {loading && !research && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '12px' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ opacity: 0.4 }}>
                    <DocListIcon size={70} />
                  </div>
                  <div style={{ position: 'absolute', left: '-24px', top: '-8px' }}>
                    <CaterpillarIcon size={50} />
                  </div>
                </div>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginTop: '8px' }}>자료를 가져오는 중...</p>
                <p style={{ fontSize: '12px', color: '#9ca3af' }}>자료를 확인하고 있어요.</p>
              </div>
            )}

            {!loading && !research && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '12px' }}>
                <CatIcon size={70} />
                <p style={{ fontSize: '14px', color: '#4b5563', textAlign: 'center', lineHeight: 1.6, marginTop: '8px' }}>
                  아직 리서치 시간이 아닙니다.<br />
                  지금 리서치를 시작하시겠어요?
                </p>
                <button
                  onClick={runNow}
                  style={{
                    marginTop: '4px',
                    padding: '8px 24px',
                    background: '#3b82f6',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: 500,
                    borderRadius: '9999px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  리서치 실행
                </button>
              </div>
            )}

            {research && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <TrendSummary trends={research.trends || []} />
                <InsightCards insights={research.insights || []} />
                <ActionItems actions={research.actions || []} />
              </div>
            )}
          </div>

          <DateNav currentDate={currentDate} onDateChange={loadResearch} />
        </>
      )}
    </div>
  )
}
