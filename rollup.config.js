import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import fs from 'fs';
import alias from '@rollup/plugin-alias';

const plugins = fs
  .readdirSync('./plugins')
  .filter(file => file.endsWith('.tsx') || file.endsWith('.ts'))
  .map(file => ({
    input: `plugins/${file}`,
    output: {
      file: `dist/plugins/${file.replace(/\.tsx?$/, '.js')}`,
      format: 'es'
    },
    external: ['react', 'react-dom'],
    plugins: [
      alias({
        entries: [
          { find: '@manifests', replacement: './manifests' },
          { find: '@plugins', replacement: './plugins' }
        ]
      }),
      nodeResolve(),
      typescript(),
      babel({
        babelHelpers: 'bundled',
        presets: ['@babel/preset-react']
      })
    ]
  }));

export default plugins;