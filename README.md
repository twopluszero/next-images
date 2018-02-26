# Next.js + Fonts

Import fonts in [Next.js](https://github.com/zeit/next.js)
(woff, woff2, eot, ttf & otf)

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
const withFonts = require('next-fonts')
module.exports = withFonts()
```

Optionally you can add your custom Next.js configuration as parameter

```js
// next.config.js
const withFonts = require('next-fonts')
module.exports = withFonts({
  webpack(config, options) {
    return config
  }
})
```
