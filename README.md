# Next.js + Images
![npm](https://img.shields.io/npm/dm/next-images.svg?style=flat-square)
![npm](https://img.shields.io/npm/l/next-images.svg?style=flat-square)
![npm](https://img.shields.io/david/arefaslani/next-images.svg)

Import images in [Next.js](https://github.com/zeit/next.js)
(jpg, jpeg, svg, png, ico, webp and gif images)

## Features
* Load images from local computer
* Load images from remote (CDN for example) [by setting assetPrefix](https://github.com/zeit/next.js/#dynamic-assetprefix)
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

Example usage:
```js
// next.config.js
const withImages = require('next-images')
module.exports = withImages({
  assetPrefix: 'https://example.com',
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
