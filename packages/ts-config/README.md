<div align="center">

![Josh Logo](https://evie.codes/josh-light.png)

# @joshdb/ts-config

**TypeScript configuration for all Josh Project repositories.**

[![GitHub](https://img.shields.io/github/license/josh-development/utilities)](https://github.com/josh-development/utilities/blob/main/LICENSE.md)
[![codecov](https://codecov.io/gh/josh-development/utilities/branch/main/graph/badge.svg?token=JnJcjxqT3k)](https://codecov.io/gh/josh-development/utilities)
[![npm](https://img.shields.io/npm/v/@joshdb/ts-config?color=crimson&logo=npm&style=flat-square)](https://www.npmjs.com/package/@joshdb/ts-config)

[![Support Server](https://discord.com/api/guilds/298508738623438848/embed.png?style=banner2)](https://discord.gg/N7ZKH3P)

</div>

## Installation

You can use the following command to install this package, or replace `npm install` with your package manager of choice.

```sh
npm install @joshdb/ts-config
```

## Usage

This package ships a couple of different sets of tsconfig, they should be used in an array of
`extends` in your `tsconfig.json` file. The supported configs are:

- `@joshdb/ts-config/base` -> This is identical to `@joshdb/ts-config`
- `@joshdb/ts-config/extra-strict`
- `@joshdb/ts-config/decorators`
- `@joshdb/ts-config/verbatim`

You should always start with the base config, regardless of what other configs you choose.
Next you can opt-in to the other configs.

Finally you should configure your package.json properly based on what kind of package you are writing

- For CJS packages you should add `"type": "commonjs"` to your `package.json`
- For ESM packages you should add `"type": "module"` to your `package.json`
- For a package that is going to be used by both CJS and ESM then you should not add any `"type"` to your `package.json`
  - Note that if you intend to compile for both your best option is to compile
    for CJS from TypeScript, then use [`gen-esm-wrapper`](https://github.com/addaleax/gen-esm-wrapper) to transform your
    input file to ESM compatible exports. This is also what we do for our Josh packages.
  - Note also that in this case you should not enable `@joshdb/ts-config/verbatim`, because it will not work without
    a `"type"` specified in `package.json`

Next we will go over the different configs and what they do.

### Base

The base config (`@joshdb/ts-config`, or `@joshdb/ts-config/base`) is the default config with options set up in
such a way that it will suite nearly all projects.

You can view the content of this tsconfig [here](https://github.com/josh-development/utilities/blob/main/packages/ts-config/src/tsconfig.json)

### Extra Strict

You should include this config if you want to extra strict checking. This configures the following compiler options:

- [`allowUnreachableCode` to `false`](https://www.typescriptlang.org/tsconfig#allowUnreachableCode)
- [`allowUnusedLabels` to `false`](https://www.typescriptlang.org/tsconfig#allowUnusedLabels)
- [`exactOptionalPropertyTypes` to `false`](https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes)
- [`noImplicitOverride` to `true`](https://www.typescriptlang.org/tsconfig#noImplicitOverride)

You can view the content of this tsconfig [here](https://github.com/josh-development/utilities/blob/main/packages/ts-config/src/extra-strict.json)

### Decorators

You should include this config if you want to use decorators in the project using decorators from before the TC39
TC39 standardization process. Note that at time of writing (2023-08-24) TC39 decorators aren't fully properly
implemented by either NodeJS or TypeScript yet, so at least at time of writing we recommend enabling this config if
you are using decorators. Packages such as `@joshdb/decorators` rely on this config being enabled.

This enables the following compiler options:

- [experimentalDecorators](https://www.typescriptlang.org/tsconfig#experimentalDecorators)
- [emitDecoratorMetadata](https://www.typescriptlang.org/tsconfig#emitDecoratorMetadata)

You can view the content of this tsconfig [here](https://github.com/josh-development/utilities/blob/main/packages/ts-config/src/decorators.json)

### Verbatim

You should include this config if you want to enable the
[verbatimModuleSyntax](https://www.typescriptlang.org/tsconfig#verbatimModuleSyntax) option. This option has some
drawbacks when writing CJS code but also ensures even more type strictness.
See the TypeScript documentation for more information.

This enables the following compiler options:

- [verbatimModuleSyntax](https://www.typescriptlang.org/tsconfig#verbatimModuleSyntax)

You can view the content of this tsconfig [here](https://github.com/josh-development/utilities/blob/main/packages/ts-config/src/verbatim.json)

### Bundler

You may include this config if bundle your code with a bundler such as [tsup], [esbuild], [swc] or something else. This
config sets [`moduleResolution` to `Bundler`][moduleResolution] and [`module` to `ES2022`][module]. This will likely also allow you to enable
[Verbatim](#verbatim).

This configures the following compiler options:

- [`moduleResolution` to `Bundler`][moduleResolution]
- [`module` to `ES2022`][module]

You can view the content of this tsconfig [here](https://github.com/josh-development/utilities/blob/main/packages/ts-config/src/bundler.json)

[module]: https://www.typescriptlang.org/tsconfig#module
[moduleResolution]: https://www.typescriptlang.org/tsconfig#moduleResolution
[tsup]: https://tsup.egoist.dev
[esbuild]: https://esbuild.github.io
[swc]: https://swc.rs
