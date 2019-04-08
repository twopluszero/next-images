# Next.js + Fonts

Import fonts in [Next.js](https://github.com/zeit/next.js)
(woff, woff2, eot, ttf, otf & svg)

## Installation

```
npm install --save next-fonts
```

or

```
yarn add next-fonts
```

## Usage

Create a `next.config.js` in your project

```js
// next.config.js
const withFonts = require('next-fonts');
module.exports = withFonts();
```

Optionally you can add your custom Next.js configuration as parameter

```js
// next.config.js
const withFonts = require('next-fonts');
module.exports = withFonts({
  webpack(config, options) {
    return config;
  }
});
```

### assetPrefix

You can serve remote resources by setting **_assetPrefix_** option.

Example usage:

```js
// next.config.js
const withFonts = require('next-fonts');
module.exports = withFonts({
  assetPrefix: 'https://example.com',
  webpack(config, options) {
    return config;
  }
});
```

### Include SVG fonts

You can also (optionally) include SVG fonts by setting **_enableSvg_** option.

Example usage:

```js
// next.config.js
const withFonts = require('next-fonts');
module.exports = withFonts({
  enableSvg: true,
  webpack(config, options) {
    return config;
  }
});
```

## Styled components

Please see https://github.com/rohanray/font-error for sample code to use with [styled components](https://www.styled-components.com/). Live URL : https://type-error-idfldxadbv.now.sh 
