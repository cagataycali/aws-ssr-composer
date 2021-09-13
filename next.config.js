const packageJsonDeps = require("./package.json").dependencies;
const { NodeModuleFederation } = require("@telenko/node-mf");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

module.exports = {
  future: { webpack5: true },
  webpack: (config, options) => {
    const { buildId, dev, isServer, defaultLoaders, webpack } = options;
    const mfConf = {
      remotes: {
        app2: isServer
          ? "app2@https://app2.ssr.cagatay.dev/node/remoteEntry.js"
          : //This is a hack (I cannot run successfully MF in client-side with NextJS and React, maybe doing smth wrong)
          {
            external: `external new Promise((r, j) => {
              window['app2'].init({
                react: {
                  "${packageJsonDeps.react}": {
                    get: () => Promise.resolve().then(() => () => globalThis.React),
                  }
                }
              });
              r({
                get: (request) => window['app2'].get(request),
                init: (args) => {}
              });
            })`,
          },
        // : "app2@http://localhost:3001/remoteEntry.js",
      },
      shared: {
        react: {
          eager: true,
          requiredVersion: packageJsonDeps["react"],
          singleton: true,
        },
        "react-dom": {
          eager: true,
          requiredVersion: packageJsonDeps["react-dom"],
          singleton: true,
        },
      },
    };
    return {
      ...config,
      plugins: [
        ...config.plugins,
        new (isServer ? NodeModuleFederation : ModuleFederationPlugin)(mfConf),
      ],
      experiments: { topLevelAwait: true },
    };
  },

  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
};