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
      const publicPath = `${assetPrefix}/_next/static/images/`;
      const outputPath = `${isServer ? "../" : ""}static/images/`;

      config.module.rules.push({
        test: /\.(jpe?g|png|svg|gif)$/,
        oneOf: [
          {
            resourceQuery: /ni-ignore/, // foo.svg?ignore
            loader: 'file-loader',
            options: {
              publicPath,
              outputPath,
              name: "[name]-[hash].[ext]"
            }
          },
          {
            loader: "url-loader",
            options: {
              limit,
              publicPath,
              outputPath,
              name: "[name]-[hash].[ext]"
            }
          },
        ]
      });

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    }
  })
}
