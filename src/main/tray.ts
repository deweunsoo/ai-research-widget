import { Tray, Menu, nativeImage, BrowserWindow } from 'electron'

export class TrayManager {
  private tray: Tray | null = null

  create(window: BrowserWindow, onRunNow: () => void): void {
    const icon = nativeImage.createFromDataURL(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAbwAAAG8B8aLcQwAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4xNkREWWUAAABJSURBVDhPY/hPIWBgYGD4T6YZDDAMN+D/f4IAEP+nGAOyATDBYBjgMACbIfjkCLoBRkZG+A1A1kzIBYRcgK4Z3QBCLiDkAgYGABwMHTGTBcGsAAAAAElFTkSuQmCC'
    )

    this.tray = new Tray(icon.resize({ width: 16, height: 16 }))

    const contextMenu = Menu.buildFromTemplate([
      { label: 'Show Widget', click: () => window.show() },
      { label: 'Run Research Now', click: onRunNow },
      { type: 'separator' },
      { label: 'Quit', click: () => { window.destroy(); process.exit(0) } }
    ])

    this.tray.setToolTip('AI Research Widget')
    this.tray.setContextMenu(contextMenu)
    this.tray.on('click', () => {
      window.isVisible() ? window.hide() : window.show()
    })
  }
}
