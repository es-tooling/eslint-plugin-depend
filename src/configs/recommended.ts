import type {ESLint, Linter} from 'eslint';

export const configFactory = (plugin: ESLint.Plugin): Linter.FlatConfig => ({
  plugins: {
    depend: plugin
  },

  rules: {
    'depend/ban-dependencies': 'error'
  }
});
