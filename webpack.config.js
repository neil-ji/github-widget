const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const getApiBuiltConfig = (base) => {
  return {
    ...base,
    target: "node",
    entry: "./src/api/index.script.ts",
    output: {
      filename: "run.js",
      path: path.resolve(__dirname, "dist-api"),
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
      ],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: "./src/api/githubstats.rb", to: "./githubstats.rb" },
        ],
      }),
    ],
  };
};

const getComponentsBuiltConfig = (base, isComponentBuilt) => {
  const plugins = [new HtmlWebpackPlugin()];

  if (!isComponentBuilt) {
    plugins.push(
      new CopyPlugin({
        patterns: [{ from: "./asserts" }],
      })
    );
  }

  return {
    ...base,
    entry: "./src/index.ts",
    output: {
      filename: "[name].[contenthash].js",
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
    plugins,
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

module.exports = function (env) {
  const isApiBuilt = env.api;
  const isComponentBuilt = env.component;
  const shared = {
    mode: "development",
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      extensionAlias: {
        ".ts": [".js", ".ts"],
        ".cts": [".cjs", ".cts"],
        ".mts": [".mjs", ".mts"],
      },
    },
  };

  if (isApiBuilt) return getApiBuiltConfig(shared);
  return getComponentsBuiltConfig(shared, isComponentBuilt);
};
