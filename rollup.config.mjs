import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import del from 'rollup-plugin-delete';
import esbuild from 'rollup-plugin-esbuild';
import dts from 'rollup-plugin-dts';

const jsBundle = {
  input: 'index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    {
      file: 'dist/index.mjs',
      format: 'es',
      sourcemap: true,
      exports: 'named',
    },
  ],
  plugins: [del({ targets: 'dist/*', runOnce: true }), resolve(), commonjs(), esbuild()],
};

const dtsBundle = {
  input: 'index.ts',
  output: {
    file: 'dist/index.d.ts',
    format: 'es',
    exports: 'named',
  },
  plugins: [resolve(), commonjs(), dts()],
};

export default [jsBundle, dtsBundle];
