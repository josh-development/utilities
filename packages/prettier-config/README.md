<div align="center">

![Josh Logo](https://evie.codes/josh-light.png)

# @joshdb/prettier-config

**Prettier configuration for all Josh Project repositories.**

[![GitHub](https://img.shields.io/github/license/josh-development/utilities)](https://github.com/josh-development/utilities/blob/main/LICENSE.md)
[![codecov](https://codecov.io/gh/josh-development/utilities/branch/main/graph/badge.svg?token=JnJcjxqT3k)](https://codecov.io/gh/josh-development/utilities)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@joshdb/prettier-config?logo=webpack&style=flat-square)](https://bundlephobia.com/result?p=@joshdb/prettier-config)
[![npm](https://img.shields.io/npm/v/@joshdb/prettier-config?color=crimson&logo=npm&style=flat-square)](https://www.npmjs.com/package/@joshdb/prettier-config)

[![Support Server](https://discord.com/api/guilds/298508738623438848/embed.png?style=banner2)](https://discord.gg/N7ZKH3P)

</div>

## Installation

You can use the following command to install this package, or replace `npm install` with your package manager of choice.

```sh
npm install @joshdb/prettier-config
```

## Usage

Add the Prettier config to your `package.json`:

```json
{
  "name": "my-project",
  "prettier": "@joshdb/prettier-config"
}
```

Or to `prettierrc.mjs`:

```js
import JoshPrettierConfig from '@joshdb/prettier-config';

export default JoshPrettierConfig;
```
