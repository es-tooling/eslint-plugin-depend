import type {ESLint} from 'eslint';

/**
 * @deprecated The legacy eslintrc configuration format is not supported in
 * ESLint 10. Use `flat/recommended` instead.
 */
export const config: ESLint.ConfigData = {
  plugins: ['depend'],
  rules: {
    'depend/ban-dependencies': 'error'
  }
};
