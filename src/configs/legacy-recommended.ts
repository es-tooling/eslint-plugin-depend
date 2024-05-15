import type {ESLint} from 'eslint';

export const config: ESLint.ConfigData = {
  plugins: ['depend'],
  rules: {
    'depend/ban-dependencies': 'error'
  }
};
