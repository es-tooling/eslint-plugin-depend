const {configs: eslintConfigs} = require('@eslint/js');
const {configs: tseslintConfigs} = require('typescript-eslint');
const pluginRecommended = require('eslint-plugin-eslint-plugin/configs/recommended');

module.exports = [
  {
    ...eslintConfigs.recommended,
    files: ['src/**/*.ts']
  },
  {
    rules: {
      'max-len': ['error', {
        ignoreTemplateLiterals: true,
        ignoreStrings: true
      }]
    }
  },
  pluginRecommended,
  ...tseslintConfigs.strict
];
