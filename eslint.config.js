import eslintjs from '@eslint/js';
import {configs as tseslintConfigs} from 'typescript-eslint';
import eslintPlugin from 'eslint-plugin-eslint-plugin';
const pluginRecommended = eslintPlugin.configs.recommended;

const {configs: eslintConfigs} = eslintjs;

export default [
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
