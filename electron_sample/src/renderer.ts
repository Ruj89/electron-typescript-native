import {ipcRenderer} from "electron";

document.getElementById('nodejs_version').innerText = process.versions.node;
document.getElementById('chromium_version').innerText = process.versions['chrome'];
document.getElementById('electron_version').innerText = process.versions['electron'];

ipcRenderer.on('get-native-string-reply', (event: Event, arg: string) => {
    document.getElementById('injected_string').innerText = arg;
});
ipcRenderer.send('get-native-string');