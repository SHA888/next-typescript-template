import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false, // We'll handle type generation separately
  sourcemap: true,
  clean: true,
  outDir: 'dist',
  target: 'es2020',
  tsconfig: './tsconfig.json',
  skipNodeModulesBundle: true,
  minify: false,
  bundle: true,
  splitting: false,
  treeshake: true,
});
