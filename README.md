# A native Electron module using Typescript

## Summary

- [Install and run on Windows](#install-and-run-on-windows)
- [Documentation](#documentation)
  - [`electron_sample` application](#electron_sample-application)
  - [`native_module` module](#native_module-module)

## Install and run on Windows

Install NodeJS.

From an elevated PowerShell or CMD.exe (run as Administrator), run

```cmd
npm install --global --production windows-build-tools
```

to install Python and Visual C++ Build Environment.

After that, launch CMD.exe as a user, enter in the project folder and launch

```cmd
cd native_module && npm install && npm run build
cd .. && cd electron_sample && npm install && npm run build
npm run start
```

After the `start` task, the native string `world` will appear inside the DOM of an Electron window.

## Documentation

The application is split in two parts:

- **`electron_sample`**: a sample application running in Electron using a Typescript Webpack bundled renderer.
- **`native_module`**: a sample Typescript module that integrates a native feature.

In order to display the sample string generated by the module in the Electron application, we need to inject it into
the application itself.

### `electron_sample` application

The application main treat is to generate an Electron application and to include the `native_module`.

The assets file are already moved in the `dist` folder and webpack is configured to build the bundle inside that folder.

The application `package.json` just includes the local path in his dependencies.

```json
"dependencies": {
    "native_module": "file:../native_module"
}
```

`devDependencies` are included to compile and run correctly the application.

In our `scripts` we have:

- `start` task, to launch the application.
- `build` task, to compile and pack Typescript and Javascript files.

### `native_module` module

First of all, let's consider the `tsconfig.json` file. Using:

```json
"declaration": true,
"outDir": "dist"
```

the Typescript compiler will use `dist` as the build directory and will generate declarations.

In the `package.json`

```json
"main": "dist/index.js",
"types": "dist/index.d.ts"
```

indicates the correct path for the main file and typing declarations.

The scripts used in this module are

```json
"build": "npm run build-native && npm run tsc",
"tsc": "tsc",
"build-native": "node-gyp rebuild"
```

- `tsc`: compiles the Typescript source code.
- `build-native`: compiles the C++ code.
- `build`: executes both.

In order to develop using a native library, we need `nan` and `node-gyp`. `@types/node` and `typescript` are useful to
compile Typescript.

```json
"dependencies": {
    "nan": "^2.14.0"
},
"devDependencies": {
    "@types/node": "^12.0.0",
    "node-gyp": "^4.0.0",
    "typescript": "^3.4.5"
}
```

In `binding.gyp` we include `nan` binaries

```json
"include_dirs": [
    "<!(node -e \"require('nan')\")"
]
```

In Typescript `index.ts` is wrapped the exported `hello` function used in the Electron application.
