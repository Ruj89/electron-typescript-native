import { IpcRendererEvent, contextBridge, ipcRenderer } from "electron";

interface ElectronWrapper {
  getVersions: (callback: (args: any[]) => void) => void;
  getNativeString: (callback: (arg: string) => void) => void;
}

let electron: ElectronWrapper = {
  getVersions: (callback: (args: any[]) => void) => {
    ipcRenderer.on("get-versions-reply", (_: IpcRendererEvent, args: any[]) =>
      callback(args)
    );
    ipcRenderer.send("get-versions");
  },
  getNativeString: (callback: (arg: string) => void) => {
    ipcRenderer.on(
      "get-native-string-reply",
      (_: IpcRendererEvent, arg: string) => callback(arg)
    );
    ipcRenderer.send("get-native-string");
  },
};

contextBridge.exposeInMainWorld("electron", electron);

// Exports
export interface ElectronWindow extends Window {
  electron: ElectronWrapper;
}
