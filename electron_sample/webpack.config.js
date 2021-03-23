const path = require("path");

module.exports = [
  {
    target: "electron-renderer",
    mode: "development",
    devtool: "inline-source-map",
    entry: "./src/renderer/renderer.ts",
    output: {
      filename: "renderer.js",
    },
    module: {
      rules: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        {
          loader: "ts-loader",
          test: /\.tsx?$/,
          include: [path.resolve(__dirname, "src/renderer")],
        },
      ],
    },
  },
];
