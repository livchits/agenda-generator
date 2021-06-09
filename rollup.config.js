import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'api/index.js',
  output: {
    dir: 'output',
    format: 'cjs',
  },
  plugins: [commonjs()],
};
