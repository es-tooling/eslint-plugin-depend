const {configs: eslintConfigs} = require('@eslint/js');
const {configs: tseslintConfigs} = require('typescript-eslint');
const pluginRecommended = require('eslint-plugin-eslint-plugin/configs/recommended');
const googleConfig = require('eslint-config-google');

module.exports = [
  {
    ...eslintConfigs.recommended,
    ...googleConfig,
    files: ['src/**/*.ts'],
  },
  {
    rules: {
      'comma-dangle': ['error', 'never'],
      'indent': 'off',
      'max-len': ['error', {
        ignoreTemplateLiterals: true,
        ignoreStrings: true
      }]
    }
  },
  pluginRecommended,
  ...tseslintConfigs.strict
];
