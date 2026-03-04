import { useState, useEffect } from 'react'

interface RssSource {
  name: string
  url: string
  enabled: boolean
}

interface AppConfig {
  scheduleHour: number
  scheduleMinute: number
  geminiApiKey: string
  rssSources: RssSource[]
  keywords: string[]
  notificationEnabled: boolean
  dataPath: string
}

interface Props {
  onBack: () => void
  onRunNow: () => void
}

export default function Settings({ onBack, onRunNow }: Props) {
  const [config, setConfig] = useState<AppConfig | null>(null)
  const [newKeyword, setNewKeyword] = useState('')
  const [newRssName, setNewRssName] = useState('')
  const [newRssUrl, setNewRssUrl] = useState('')

  useEffect(() => {
    window.api.getConfig().then(setConfig)
  }, [])

  const save = async (updated: Partial<AppConfig>) => {
    if (!config) return
    const newConfig = { ...config, ...updated }
    setConfig(newConfig)
    await window.api.saveConfig(newConfig)
  }

  if (!config) return <div className="text-gray-400 text-sm">로딩 중...</div>

  return (
    <div className="space-y-4 overflow-y-auto h-full pr-1">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={onBack} className="text-gray-400 hover:text-gray-800 text-sm">&larr;</button>
        <h2 className="text-base font-bold text-gray-800">설정</h2>
      </div>

      <div>
        <label className="text-xs text-gray-500 block mb-1">리서치 시간</label>
        <div className="flex gap-2 items-center">
          <input
            type="number" min={0} max={23}
            value={config.scheduleHour}
            onChange={e => save({ scheduleHour: Number(e.target.value) })}
            className="w-14 bg-gray-100 border border-gray-200 rounded px-2 py-1 text-sm text-gray-800"
          />
          <span className="text-gray-500">시</span>
          <input
            type="number" min={0} max={59}
            value={config.scheduleMinute}
            onChange={e => save({ scheduleMinute: Number(e.target.value) })}
            className="w-14 bg-gray-100 border border-gray-200 rounded px-2 py-1 text-sm text-gray-800"
          />
          <span className="text-gray-500">분</span>
        </div>
      </div>

      <div>
        <label className="text-xs text-gray-500 block mb-1">Gemini API Key</label>
        <input
          type="password"
          value={config.geminiApiKey}
          onChange={e => save({ geminiApiKey: e.target.value })}
          placeholder="API Key 입력"
          className="w-full bg-gray-100 border border-gray-200 rounded px-2 py-1.5 text-sm text-gray-800 placeholder-gray-400"
        />
      </div>

      <div>
        <label className="text-xs text-gray-500 block mb-1">RSS 소스</label>
        <div className="space-y-1">
          {config.rssSources.map((source, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={source.enabled}
                onChange={e => {
                  const updated = [...config.rssSources]
                  updated[i] = { ...source, enabled: e.target.checked }
                  save({ rssSources: updated })
                }}
                className="rounded"
              />
              <span className="text-xs text-gray-600 flex-1">{source.name}</span>
              <button
                onClick={() => save({ rssSources: config.rssSources.filter((_, j) => j !== i) })}
                className="text-xs text-red-400 hover:text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-1 mt-2">
          <input
            value={newRssName}
            onChange={e => setNewRssName(e.target.value)}
            placeholder="이름"
            className="flex-1 bg-gray-100 border border-gray-200 rounded px-2 py-1 text-xs text-gray-800 placeholder-gray-400"
          />
          <input
            value={newRssUrl}
            onChange={e => setNewRssUrl(e.target.value)}
            placeholder="RSS URL"
            className="flex-[2] bg-gray-100 border border-gray-200 rounded px-2 py-1 text-xs text-gray-800 placeholder-gray-400"
          />
          <button
            onClick={() => {
              if (newRssName && newRssUrl) {
                save({ rssSources: [...config.rssSources, { name: newRssName, url: newRssUrl, enabled: true }] })
                setNewRssName('')
                setNewRssUrl('')
              }
            }}
            className="text-xs text-blue-500 hover:text-blue-600 px-2"
          >
            +
          </button>
        </div>
      </div>

      <div>
        <label className="text-xs text-gray-500 block mb-1">관심 키워드</label>
        <div className="flex flex-wrap gap-1 mb-1">
          {config.keywords.map((kw, i) => (
            <span key={i} className="bg-gray-100 rounded-full px-2 py-0.5 text-xs text-gray-600 flex items-center gap-1">
              {kw}
              <button
                onClick={() => save({ keywords: config.keywords.filter((_, j) => j !== i) })}
                className="text-red-400 hover:text-red-500"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
        <input
          value={newKeyword}
          onChange={e => setNewKeyword(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && newKeyword) {
              save({ keywords: [...config.keywords, newKeyword] })
              setNewKeyword('')
            }
          }}
          placeholder="키워드 추가 (Enter)"
          className="w-full bg-gray-100 border border-gray-200 rounded px-2 py-1 text-xs text-gray-800 placeholder-gray-400"
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="text-xs text-gray-500">macOS 알림</label>
        <button
          onClick={() => save({ notificationEnabled: !config.notificationEnabled })}
          className={`w-10 h-5 rounded-full transition ${config.notificationEnabled ? 'bg-blue-500' : 'bg-gray-300'} relative`}
        >
          <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition shadow ${config.notificationEnabled ? 'left-5' : 'left-0.5'}`} />
        </button>
      </div>

      <button
        onClick={onRunNow}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 text-sm font-medium transition"
      >
        수동 리서치 실행
      </button>
    </div>
  )
}
