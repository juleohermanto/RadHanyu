const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');

let mainWindow = null;

const COLLAPSED_WIDTH = 330;
const COLLAPSED_HEIGHT = 90;
const EXPANDED_WIDTH = 640;
const EXPANDED_HEIGHT = 300;

function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize;

  const initialX = screenWidth - COLLAPSED_WIDTH - 24;
  const initialY = screenHeight - COLLAPSED_HEIGHT - 24;

  mainWindow = new BrowserWindow({
    width: COLLAPSED_WIDTH,
    height: COLLAPSED_HEIGHT,
    x: initialX,
    y: initialY,
    frame: false,
    transparent: true,
    resizable: false,
    alwaysOnTop: false,
    skipTaskbar: true,
    hasShadow: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'src', 'index.html'));

  mainWindow.on('blur', () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('auto-collapse');
    }
  });
}

ipcMain.on('resize-widget', (event, expanded, customHeight) => {
  if (!mainWindow || mainWindow.isDestroyed()) return;

  const targetWidth = expanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH;
  let targetHeight = COLLAPSED_HEIGHT;

  if (expanded) {
    const measured = customHeight ? Math.ceil(customHeight) + 4 : EXPANDED_HEIGHT;
    targetHeight = Math.max(EXPANDED_HEIGHT, Math.min(measured, 380));
  }

  const [startX, startY] = mainWindow.getPosition();
  const [startW, startH] = mainWindow.getSize();
  

  const endX = startX - (targetWidth - startW);
  const endY = startY - (targetHeight - startH);

  if (startH === targetHeight && startW === targetWidth) return;

  mainWindow.setBounds({
    x: endX,
    y: endY,
    width: targetWidth,
    height: targetHeight
  });
});

ipcMain.on('toggle-pin', (event) => {
  if (!mainWindow || mainWindow.isDestroyed()) return;
  const isPinned = !mainWindow.isAlwaysOnTop();
  mainWindow.setAlwaysOnTop(isPinned);
  event.reply('pin-status', isPinned);
});

ipcMain.on('close-widget', () => {
  if (mainWindow) mainWindow.close();
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
