import { ElectronWindow } from "../electron/preload";

declare let window: ElectronWindow;

window.electron.getNativeString((arg: string) => {
  document.getElementById("injected_string").innerText = arg;
});
window.electron.getVersions((arg: any) => {
  document.getElementById("nodejs_version").innerText = arg.node;
  document.getElementById("chromium_version").innerText = arg.chrome;
  document.getElementById("electron_version").innerText = arg.electron;
});
