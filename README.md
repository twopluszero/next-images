# Next.js + Images

Import images in [Next.js](https://github.com/zeit/next.js)
(jpg, jpeg, svg, png and gif images)

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
