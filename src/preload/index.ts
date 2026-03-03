import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  getResearch: (date: string) => ipcRenderer.invoke('get-research', date),
  getTodayResearch: () => ipcRenderer.invoke('get-today-research'),
  getResearchDates: () => ipcRenderer.invoke('get-research-dates'),
  getConfig: () => ipcRenderer.invoke('get-config'),
  saveConfig: (config: any) => ipcRenderer.invoke('save-config', config),
  runResearchNow: () => ipcRenderer.invoke('run-research-now'),
  onResearchComplete: (callback: (result: any) => void) => {
    const handler = (_event: any, result: any) => callback(result)
    ipcRenderer.on('research-complete', handler)
    return () => ipcRenderer.removeListener('research-complete', handler)
  }
})
