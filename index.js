module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    publicRuntimeConfig: Object.assign({}, nextConfig.publicRuntimeConfig, {
      nextImagesAssetPrefix: nextConfig.assetPrefix
    }),
    webpack(config, options) {
      const { isServer } = options;
      nextConfig = Object.assign({
        inlineImageLimit: 8192,
        assetPrefix: "",
        basePath: "",
        fileExtensions: ["jpg", "jpeg", "png", "svg", "gif", "ico", "webp", "jp2"],
      }, nextConfig);

      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        )
      }

      config.module.rules.push({
        test: new RegExp(`\.(${nextConfig.fileExtensions.join('|')})$`),
        // Next.js already handles url() in css/sass/scss files
        issuer: /\.\w+(?<!(s?c|sa)ss)$/i,
        exclude: nextConfig.exclude,
        use: [
          {
            loader: require.resolve("url-loader"),
            options: {
              limit: nextConfig.inlineImageLimit,
              fallback: require.resolve("file-loader"),
              publicPath: `${nextConfig.assetPrefix || nextConfig.basePath}/_next/static/images/`,
              outputPath: `${isServer ? "../" : ""}static/images/`,
              postTransformPublicPath: (p) => {
                if (!nextConfig.assetPrefix) {
                  return `(require("next/config").default().publicRuntimeConfig.nextImagesAssetPrefix || '') + ${p}`
                }
                // no need to dynamically prepend assetPrefix to p since it was defined in transpilation-time
                return p
              },
              name: "[name]-[hash].[ext]",
              esModule: nextConfig.esModule || false
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
