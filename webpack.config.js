const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const getComponentsBuiltConfig = (base) => {
  return {
    ...base,
    externals: ["echarts", "lit"],
    externalsType: "umd",
    entry: {
      index: "./src/components/index.ts",
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
      library: {
        type: "umd",
      },
    },
    module: {
      rules: [
        {
          test: /.([cm]?ts|tsx)$/,
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
      },
    },
  };
};

const getDebugModeConfig = (base) => {
  return {
    ...base,
    entry: {
      index: {
        import: "./src/index.ts",
        dependOn: ["echarts", "lit"],
      },
      echarts: {
        import: "echarts",
      },
      lit: {
        import: "lit",
      },
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /.([cm]?ts|tsx)$/,
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [new HtmlWebpackPlugin()],
    devtool: "inline-source-map",
    devServer: {
      static: "./dist",
    },
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
      },
    },
  };
};

const getAnalyzeModeConfig = (base) => {
  return {
    ...base,
    plugins: [
      ...(base.plugins ?? []),
      new BundleAnalyzerPlugin({
        analyzerMode: "server",
        analyzerHost: "127.0.0.1",
        analyzerPort: 9999,
        reportFilename: "report.html",
        openAnalyzer: true,
      }),
    ],
  };
};

module.exports = function (env) {
  const mode = env.mode;
  const shared = {
    mode: mode === "debug" ? "development" : "production",
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      extensionAlias: {
        ".ts": [".js", ".ts"],
        ".cts": [".cjs", ".cts"],
        ".mts": [".mjs", ".mts"],
      },
    },
  };

  switch (mode) {
    case "debug":
      return getDebugModeConfig(shared);
    case "analyze":
      return getAnalyzeModeConfig(getComponentsBuiltConfig(shared));
    default:
      return getComponentsBuiltConfig(shared);
  }
};
