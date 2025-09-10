# @fatcherjs/middleware-form-data

<div align="center">
  <a href="https://codecov.io/github/fatcherjs/middleware-form-data" > 
    <img src="https://codecov.io/github/fatcherjs/middleware-form-data/graph/badge.svg?token=RPCSSLFSNF"/> 
 </a>
  <a href="https://www.jsdelivr.com/package/npm/@fatcherjs/middleware-form-data">
    <img src="https://data.jsdelivr.com/v1/package/npm/@fatcherjs/middleware-form-data/badge?style=rounded" alt="jsDelivr">
  </a>
  <a href="https://packagephobia.com/result?p=@fatcherjs/middleware-form-data">
    <img src="https://packagephobia.com/badge?p=@fatcherjs/middleware-form-data" alt="install size">
  </a>
  <a href="https://unpkg.com/@fatcherjs/middleware-form-data">
    <img src="https://img.badgesize.io/https://unpkg.com/@fatcherjs/middleware-form-data" alt="Size">
  </a>
  <a href="https://npmjs.com/package/@fatcherjs/middleware-form-data">
    <img src="https://img.shields.io/npm/v/@fatcherjs/middleware-form-data.svg" alt="npm package">
  </a>
  <a href="https://github.com/fatcherjs/middleware-form-data/actions/workflows/ci.yml">
    <img src="https://github.com/fatcherjs/middleware-form-data/actions/workflows/ci.yml/badge.svg?branch=master" alt="build status">
  </a>
</div>

## Install

### NPM

```bash
>$ npm install @fatcherjs/middleware-form-data
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@fatcherjs/middleware-form-data/dist/index.min.js"></script>
```

## Usage

```ts
import { fatcher } from 'fatcher';
import { formData } from '@fatcherjs/middleware-form-data';

fatcher('https://foo.bar', {
  middlewares: [formData],
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  method: 'POST',
  body: {
    foo: 'bar',
    test: 'a',
  },
});
```

## License

[MIT](https://github.com/fatcherjs/middleware-form-data/blob/master/LICENSE)
