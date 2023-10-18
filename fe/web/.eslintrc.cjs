// module.exports = {
//   root: true,
//   env: { browser: true, es2020: true },
//   extends: [
//     'eslint:recommended',
//     'plugin:@typescript-eslint/recommended',
//     'plugin:react-hooks/recommended',
//     'prettier',
//     '../../packages/eslint-config-custom/react-internal.js',
//   ],
//   parser: '@typescript-eslint/parser',
//   ignorePatterns: ['dist', '.eslintrc.cjs'],
//   rules: {
//     'react-refresh/only-export-components': [
//       'warn',
//       { allowConstantExport: true },
//     ],
//   },
//   plugins: ['react-refresh'],
// };
module.exports = {
  root: true,
  extends: ['eslint-config-custom'],
};
