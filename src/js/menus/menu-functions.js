const { remote, ipcRenderer } = require("electron");
const isMac = process.platform === "darwin";

function getCurrentWindow() {
  return remote.getCurrentWindow();
}

function openMenu(x, y) {
  ipcRenderer.send(`display-app-menu`, { x, y });
}

function minimizeWindow(browserWindow = getCurrentWindow()) {
  if (browserWindow.minimizable) {
    browserWindow.minimize();
  }
}

function maximizeWindow(browserWindow = getCurrentWindow()) {
  if (browserWindow.fullScreenable) {
    browserWindow.setFullScreen(true);
    return;
  }
  if (browserWindow.maximizable) browserWindow.maximize();
}

function unmaximizeWindow(browserWindow = getCurrentWindow()) {
  browserWindow.unmaximize();
  browserWindow.setFullScreen(false);
}

function maxUnmaxWindow(browserWindow = getCurrentWindow()) {
  if (isMac) {
    browserWindow.setFullScreen(browserWindow.isFullScreen() ? false : true);
    return;
  }
  if (browserWindow.isMaximized()) {
    browserWindow.unmaximize();
  } else {
    browserWindow.maximize();
  }
}

function closeWindow(browserWindow = getCurrentWindow()) {
  browserWindow.close();
}

function isWindowMaximized(browserWindow = getCurrentWindow()) {
  return browserWindow.isMaximized() || browserWindow.isFullScreen();
}

module.exports = {
  getCurrentWindow,
  openMenu,
  minimizeWindow,
  maximizeWindow,
  unmaximizeWindow,
  maxUnmaxWindow,
  isWindowMaximized,
  closeWindow,
};
