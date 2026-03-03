import { useState } from 'react'
import Header from './components/Header'
import TrendSummary from './components/TrendSummary'
import InsightCards from './components/InsightCard'
import ActionItems from './components/ActionItems'
import DateNav from './components/DateNav'
import Settings from './components/Settings'
import { useResearch } from './hooks/useResearch'

export default function App() {
  const { research, loading, currentDate, loadResearch, runNow } = useResearch()
  const [showSettings, setShowSettings] = useState(false)

  return (
    <div className="h-screen w-screen rounded-2xl bg-gray-950/95 backdrop-blur-xl text-white p-4 flex flex-col overflow-hidden border border-white/10">
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

          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {loading && !research && (
              <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                리서치를 불러오는 중...
              </div>
            )}

            {!loading && !research && (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 text-sm gap-2">
                <p>아직 리서치 데이터가 없습니다.</p>
                <p className="text-xs">설정에서 API Key를 입력하고 수동 실행해보세요.</p>
              </div>
            )}

            {research && (
              <>
                <TrendSummary trends={research.trends || []} />
                <InsightCards insights={research.insights || []} />
                <ActionItems actions={research.actions || []} />
              </>
            )}
          </div>

          <DateNav currentDate={currentDate} onDateChange={loadResearch} />
        </>
      )}
    </div>
  )
}
