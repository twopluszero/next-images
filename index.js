module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      const { isServer } = options;
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        )
      }

      const assetPrefix = nextConfig.assetPrefix || "";
      const limit = nextConfig.inlineImageLimit || 8192;

      config.module.rules.push({
        test: /\.(jpe?g|png|svg|gif|ico)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit,
              fallback: "file-loader",
              publicPath: `${assetPrefix}/_next/static/images/`,
              outputPath: `${isServer ? "../" : ""}static/images/`,
              name: "[name]-[hash].[ext]"
            }
          }
        ]
      });

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    }
  })
}
