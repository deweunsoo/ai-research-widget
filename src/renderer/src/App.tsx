import { useState, useRef, useEffect, useCallback } from 'react'
import Header from './components/Header'
import TrendSummary from './components/TrendSummary'
import InsightCards from './components/InsightCard'
import ActionItems from './components/ActionItems'
import DateNav from './components/DateNav'
import Settings from './components/Settings'
import { useResearch } from './hooks/useResearch'
import { CatIcon, CaterpillarIcon, DocListIcon } from './components/icons'

function toMarkdown(research: any): string {
  let md = `# 리서치 결과 (${research.date})\n\n`
  if (research.trends?.length) {
    md += `## 핵심 트렌드\n`
    research.trends.forEach((t: any) => { md += `- ${t.text}\n` })
    md += '\n'
  }
  if (research.insights?.length) {
    md += `## 인사이트\n`
    research.insights.forEach((ins: any) => {
      md += `### ${ins.title}\n${ins.body}\n\n`
    })
  }
  if (research.actions?.length) {
    md += `## 실무 적용 제안\n`
    research.actions.forEach((a: any) => { md += `- [${a.category}] ${a.text}\n` })
  }
  return md
}

export default function App() {
  const { research, loading, currentDate, loadResearch, runNow, clear } = useResearch()
  const [showSettings, setShowSettings] = useState(false)
  const [copied, setCopied] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const syncHeight = useCallback(() => {
    if (!loading && research && contentRef.current) {
      const contentH = contentRef.current.scrollHeight
      window.api.resizeWindow(contentH + 140)
    } else {
      window.api.resizeWindow(520)
    }
  }, [research, loading])

  useEffect(() => {
    requestAnimationFrame(syncHeight)
  }, [research, loading, showSettings, syncHeight])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!e.metaKey) return
      const map: Record<string, string> = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down' }
      const dir = map[e.key]
      if (dir) {
        e.preventDefault()
        window.api.snapWindow(dir)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleCopy = () => {
    if (!research) return
    navigator.clipboard.writeText(toMarkdown(research))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className="glass-panel"
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxSizing: 'border-box',
        fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", sans-serif',
        letterSpacing: '-0.3px',
        WebkitFontSmoothing: 'antialiased'
      }}
    >
      {showSettings ? (
        <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          <Settings onBack={() => setShowSettings(false)} onRunNow={runNow} />
        </div>
      ) : (
        <>
          <Header
            currentDate={currentDate}
            generatedAt={research?.generatedAt}
            onSettingsClick={() => setShowSettings(true)}
            onClear={clear}
            loading={loading}
          />

          <div ref={contentRef} className="scrollable" style={{ flex: 1, overflowY: 'auto', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            {loading && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: '4px' }}>
                <div style={{ position: 'relative', marginBottom: '24px' }}>
                  <div style={{ opacity: 0.35 }}>
                    <DocListIcon size={80} />
                  </div>
                  <div className="caterpillar-walk" style={{ position: 'absolute', top: '30px' }}>
                    <CaterpillarIcon size={56} />
                  </div>
                </div>
                <p style={{ fontSize: '20px', fontWeight: 600, color: '#1f2937', margin: 0 }}>자료를 가져오는 중...</p>
                <p style={{ fontSize: '16px', color: '#9ca3af', margin: 0, marginTop: '-2px' }}>자료를 확인하고 있어요.</p>
              </div>
            )}

            {!loading && !research && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: '12px' }}>
                <div className="cat-bounce"><CatIcon size={70} /></div>
                <p style={{ fontSize: '18px', color: '#4b5563', textAlign: 'center', lineHeight: 1.6, marginTop: '8px' }}>
                  아직 리서치 시간이 아닙니다.<br />
                  지금 리서치를 시작하시겠어요?
                </p>
                <button
                  onClick={runNow}
                  style={{
                    marginTop: '8px',
                    padding: '14px 36px',
                    background: '#3b82f6',
                    color: '#ffffff',
                    fontSize: '17px',
                    fontWeight: 600,
                    borderRadius: '9999px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  리서치 실행
                </button>
              </div>
            )}

            {!loading && research && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={handleCopy}
                    style={{
                      background: '#3182F6',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 18px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      letterSpacing: '-0.2px'
                    }}
                  >
                    {copied ? '복사됨!' : '마크다운 복사'}
                  </button>
                </div>
                <TrendSummary trends={research.trends || []} headline={research.trendHeadline} />
                <InsightCards insights={research.insights || []} headline={research.insightHeadline} />
                <ActionItems actions={research.actions || []} headline={research.actionHeadline} />
              </div>
            )}
          </div>

          <DateNav currentDate={currentDate} onDateChange={loadResearch} />
        </>
      )}
    </div>
  )
}
