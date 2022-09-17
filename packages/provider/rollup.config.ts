import { resolve } from 'node:path';
import { defineConfig } from 'rollup';
import cleaner from 'rollup-plugin-cleaner';
import typescript from 'rollup-plugin-typescript2';

export default defineConfig({
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
    },
    {
      file: './dist/index.umd.js',
      format: 'umd',
      name: 'JoshProvider',
      sourcemap: true,
      globals: {
        '@sapphire/utilities': 'SapphireUtilities',
        vitest: 'Vitest'
      }
    }
  ],
  external: ['@sapphire/utilities', 'reflect-metadata', 'vitest'],
  plugins: [cleaner({ targets: ['./dist'] }), typescript({ tsconfig: resolve(process.cwd(), 'src', 'tsconfig.json') })]
});
