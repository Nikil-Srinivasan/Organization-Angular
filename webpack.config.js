const { sentryWebpackPlugin } = require("@sentry/webpack-plugin");

module.exports = {
  devtool: "source-map", // Source map generation must be turned on
  plugins: [
    sentryWebpackPlugin({
      org: "kovai-eb",
      project: "stint360",

      // Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
      // and need the `project:releases` and `org:read` scopes
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
};