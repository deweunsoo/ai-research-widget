import { app, BrowserWindow, ipcMain, Notification, screen } from 'electron'
import path from 'path'
import os from 'os'
import { StorageService } from './services/storage'
import { ResearchOrchestrator } from './services/orchestrator'
import { Scheduler } from './scheduler'
import { TrayManager } from './tray'

const DATA_PATH = path.join(os.homedir(), 'ai-research-widget')
const storage = new StorageService(DATA_PATH)
const scheduler = new Scheduler()
const trayManager = new TrayManager()

let mainWindow: BrowserWindow | null = null

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 380,
    height: 520,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    skipTaskbar: true,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  const display = screen.getPrimaryDisplay()
  const { width, height } = display.workAreaSize
  mainWindow.setPosition(width - 400, height - 540)

  mainWindow.on('ready-to-show', () => mainWindow?.show())

  if (process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
}

async function runResearch(): Promise<void> {
  const config = storage.loadConfig()
  if (!config.geminiApiKey) {
    mainWindow?.webContents.send('research-complete', null)
    return
  }

  try {
    const orchestrator = new ResearchOrchestrator(config.geminiApiKey)
    const result = await orchestrator.run(config)
    storage.saveResearch(result)

    mainWindow?.webContents.send('research-complete', result)

    if (config.notificationEnabled) {
      new Notification({
        title: '오늘의 AI 리서치 도착',
        body: result.trends[0]?.text || '새로운 리서치가 준비되었습니다.'
      }).show()
    }
  } catch (error) {
    console.error('Research failed:', error)
  }
}

function setupIPC(): void {
  ipcMain.handle('get-research', (_e, date: string) => storage.loadResearch(date))
  ipcMain.handle('get-today-research', () => {
    const today = new Date().toISOString().split('T')[0]
    return storage.loadResearch(today)
  })
  ipcMain.handle('get-research-dates', () => storage.listResearchDates())
  ipcMain.handle('get-config', () => storage.loadConfig())
  ipcMain.handle('save-config', (_e, config) => {
    storage.saveConfig(config)
    scheduler.reschedule(config.scheduleHour, config.scheduleMinute, runResearch)
  })
  ipcMain.handle('run-research-now', () => runResearch())
}

app.whenReady().then(() => {
  createWindow()
  setupIPC()

  const config = storage.loadConfig()
  scheduler.start(config.scheduleHour, config.scheduleMinute, runResearch)
  trayManager.create(mainWindow!, runResearch)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  mainWindow?.show()
})
