# eslint-plugin-optimize

This is an ESLint plugin to suggest various optimizations in your
sources.

Primarily, it will help detect dependency tree bloat and redundant
polyfills.

## Install

```sh
npm i -D eslint-plugin-optimize
```

## Usage

Add to your `.eslintrc.json`:

```json
{
  "extends": [
    "plugin:optimize/recommended"
  ]
}
```

Or if you're using (flat) config files, add to your `eslint.config.js`:

```ts
import {configs} from 'eslint-plugin-optimize';

export default [
  configs.recommended,

  // or if you want to specify `files`, or other options
  {
    ...configs.recommended,
    files: ['test/**/*.js']
  }
];
```

## License

MIT
