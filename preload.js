const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  resizeWidget: (expanded, customHeight) => ipcRenderer.send('resize-widget', expanded, customHeight),
  closeWidget: () => ipcRenderer.send('close-widget'),
  togglePin: () => ipcRenderer.send('toggle-pin'),
  onPinStatus: (callback) => ipcRenderer.on('pin-status', (event, isPinned) => callback(isPinned)),
  onAutoCollapse: (callback) => ipcRenderer.on('auto-collapse', () => callback())
});
