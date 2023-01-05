import { resolve } from 'node:path';
import { defineConfig } from 'rollup';
import cleaner from 'rollup-plugin-cleaner';
import typescript from 'rollup-plugin-typescript2';

const main = defineConfig({
  input: './src/index.ts',
  output: [
    {
      file: './dist/index.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    {
      file: './dist/index.mjs',
      format: 'es',
      exports: 'named',
      sourcemap: true
    }
  ],
  external: ['@sapphire/utilities', 'reflect-metadata'],
  plugins: [cleaner({ targets: ['./dist'] }), typescript({ tsconfig: resolve(process.cwd(), 'src', 'tsconfig.json') })]
});

const tests = defineConfig({
  input: './src/tests/index.ts',
  output: [
    {
      file: './dist/tests.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    {
      file: './dist/tests.mjs',
      format: 'es',
      exports: 'named',
      sourcemap: true
    }
  ],
  external: ['@sapphire/utilities', 'reflect-metadata', 'vitest'],
  plugins: [typescript({ tsconfig: resolve(process.cwd(), 'src', 'tsconfig.json') })]
});

const config = [main, tests];

export default defineConfig(config);
