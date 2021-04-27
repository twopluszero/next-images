# Next.js + Images
![npm](https://img.shields.io/npm/dm/next-images.svg?style=flat-square)
![npm](https://img.shields.io/npm/l/next-images.svg?style=flat-square)
![npm](https://img.shields.io/david/arefaslani/next-images.svg)

Import images in [Next.js](https://github.com/zeit/next.js)
(jpg, jpeg, png, svg, fig, ico, webp, jp2 and avif images by default).

## Features
* Load images from local computer
* Load images from remote (CDN for example) [by setting assetPrefix](https://nextjs.org/docs/api-reference/next.config.js/cdn-support-with-asset-prefix)
* Inline small images to Base64 for reducing http requests
* Adds a content hash to the file name so images can get cached

If you also want image minimalization and optimization have a look at [next-optimized-images](https://github.com/cyrilwanner/next-optimized-images)

## Installation

```
npm install --save next-images
```

or

```
yarn add next-images
```

## Usage

Create a `next.config.js` in your project

```js
// next.config.js
const withImages = require('next-images')
module.exports = withImages()
```

Optionally you can add your custom Next.js configuration as parameter

```js
// next.config.js
const withImages = require('next-images')
module.exports = withImages({
  webpack(config, options) {
    return config
  }
})
```

And in your components or pages simply import your images:

```js
export default () => <div>
  <img src={require('./my-image.jpg')} />
</div>
```
or
```js
import img from './my-image.jpg'

export default () => <div>
  <img src={img} />
</div>
```

## Options

### assetPrefix
You can serve remote images by setting ***assetPrefix*** option.

Dynamic (runtime) asset prefixes are also supported, you can enable this feature by setting ***dynamicAssetPrefix*** to `true`.

Example usage:
```js
// next.config.js
const withImages = require('next-images')
module.exports = withImages({
  assetPrefix: 'https://example.com',
  dynamicAssetPrefix: true,
  webpack(config, options) {
    return config
  }
})
```

### InlineImageLimit
Inlines images with sizes below ***inlineImageLimit*** to Base64. Default value is 8192.

Example usage:
```js
// next.config.js
const withImages = require('next-images')
module.exports = withImages({
  inlineImageLimit: 16384,
  webpack(config, options) {
    return config
  }
})
```

### Exclude
Folders that you want to exclude from the loader. Useful for `svg-react-loader` for example.

Example usage:
```js
// next.config.js
const path = require('path');
const withImages = require('next-images')
module.exports = withImages({
  exclude: path.resolve(__dirname, 'src/assets/svg'),
  webpack(config, options) {
    return config
  }
})
```

### File Extensions
You have the power to specifiy the file extensions you'd like to pass to this loader configuration. This is helpful for
adding image types that behave similarly, but are not included by default. It's also helpful in the same way that
`exclude` is helpful, because you can exclude all SVGs (not just one from a specific folder).

**TypeScript Users:** If you exclude a file suffix, please note our shipped types declaration file will be incorrect. You'll want to use declaration merging or override dependencies for the same file suffixes as needed.

**Please note**: If you have issues with a file suffix not included in our default list
(["jpg", "jpeg", "png", "svg", "gif", "ico", "webp", "jp2", "avif"]), we won't be able to guarantee bug support.

Example usage:
```js
// next.config.js
const withImages = require('next-images')
module.exports = withImages({
  fileExtensions: ["jpg", "jpeg", "png", "gif"],
  webpack(config, options) {
    return config
  }
})
```

### Name
You can change the structure of the generated file names by passing the `name` option:

```js
// next.config.js
const withImages = require('next-images')
module.exports = withImages({
  name: "[name].[hash:base64:8].[ext]",
  webpack(config, options) {
    return config
  }
})
```

The default value is `"[name]-[hash].[ext]"`.  Documentation for available tokens like `[name]`, `[hash]`, etc can be found in [webpack/loader-utils](https://github.com/webpack/loader-utils#interpolatename)

### ES Modules
> By default, file-loader generates JS modules that use the ES modules syntax. There are some cases in which using ES modules is beneficial, like in the case of module concatenation and tree shaking.

ES Modules are disabled by default. You can enable them by using `esModule` config option:

```javascript
const withImages = require('next-images')
module.exports = withImages({
  esModule: true,
  webpack(config, options) {
    return config
  }
})
```

By enabling ES modules you should change your require statements and get default property out of them:

```javascript
<img src={require("./img.png").default}>
```

import statement should be as before.

```javascript
import img from "./img.png";
```

### Typescript
Typescript doesn't know how interpret imported images. `next-images` package contains definitions for image modules,
**you need to add reference to next-images types** (third line) into your `next-env.d.ts` file.

```diff
/// <reference types="next" />
/// <reference types="next/types/global" />

+ /// <reference types="next-images" />
```

### With `next/image`

Base4/Data URL encoding is not supported when using the `next/image` component for image optimization. To deactivate inline images you can set the `inlineImageLimit` to `false`:

```js
// next.config.js
const withImages = require('next-images')
module.exports = withImages({
  inlineImageLimit: false
})
```

### Bonus
Try out some of these awesome NextJS dashboard templates developed by Creative Team and support this project indirectly :)

[https://www.creative-tim.com/product/nextjs-argon-dashboard-pro/?ref=next-images](https://www.creative-tim.com/product/nextjs-argon-dashboard-pro/?ref=next-images)

[https://www.creative-tim.com/product/nextjs-material-kit-pro/?ref=next-images](https://www.creative-tim.com/product/nextjs-material-kit-pro/?ref=next-images)

[https://www.creative-tim.com/product/nextjs-material-kit/?ref=next-images](https://www.creative-tim.com/product/nextjs-material-kit/?ref=next-images)
