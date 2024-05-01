<div align="center">

![Josh Logo](https://evie.codes/josh-light.png)

# @joshdb/eslint-config

**ESLint configuration for all Josh Project repositories.**

[![GitHub](https://img.shields.io/github/license/josh-development/utilities)](https://github.com/josh-development/utilities/blob/main/LICENSE.md)
[![codecov](https://codecov.io/gh/josh-development/utilities/branch/main/graph/badge.svg?token=JnJcjxqT3k)](https://codecov.io/gh/josh-development/utilities)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@joshdb/eslint-config?logo=webpack&style=flat-square)](https://bundlephobia.com/result?p=@joshdb/eslint-config)
[![npm](https://img.shields.io/npm/v/@joshdb/eslint-config?color=crimson&logo=npm&style=flat-square)](https://www.npmjs.com/package/@joshdb/eslint-config)

[![Support Server](https://discord.com/api/guilds/298508738623438848/embed.png?style=banner2)](https://discord.gg/N7ZKH3P)

</div>

## Installation

You can use the following command to install this package, or replace `npm install` with your package manager of choice.

```sh
npm install @joshdb/eslint-config
```

## Usage

Add the ESLint config to your `package.json`:

```json
{
  "name": "my-project",
  "eslintConfig": {
    "extends": "@joshdb/eslint-config"
  }
}
```

Or to your `.eslintrc.js` / `.eslintrc.json`:

```json
{
  "extends": "@joshdb/eslint-config"
}
```

Create `tsconfig.eslint.json` next to the eslint config file, for example with content:

```json
{
  "extends": "./tsconfig.base.json",
  "include": ["src", "tests"]
}
```
