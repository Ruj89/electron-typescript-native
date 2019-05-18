const {app, BrowserWindow, ipcMain} = require('electron');
const {hello} = require('native_module');
const path = require('path');
const url = require('url');

/*** Main window context ***/
let mainWindow = null;

// Create an 800x600 window showing the content of index.html
function createMainWindow() {
    if (mainWindow !== null)
        return;

    mainWindow = new BrowserWindow({width: 800, height: 600, webPreferences: {nodeIntegration: true}});

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// Kill process if all windows are closed and it's not a MacOSX application
function darwinHack() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
}

/*** Global Electron events ***/
app.on('window-all-closed', darwinHack);
app.on('activate', createMainWindow);
app.on('ready', createMainWindow);
ipcMain.on('get-native-string', (event) => {
    event.sender.send('get-native-string-reply', hello());
});