// filepath: /home/administrator/GitHub/React/qualities/craco.config.js
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const oneOfRule = webpackConfig.module.rules.find((rule) =>
        Array.isArray(rule.oneOf)
      );
      if (oneOfRule) {
        oneOfRule.oneOf.forEach((rule) => {
          if (rule.loader && rule.loader.includes("babel-loader")) {
            rule.exclude = /node_modules\/(?!@sentry)/;
          }
        });
      }
      return webpackConfig;
    },
  },
};
