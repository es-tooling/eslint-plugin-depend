import type {ESLint, Linter} from 'eslint';
import {expect, test} from 'vitest';
import {configs} from '../main.js';

type ConfigLike = Linter.Config | ESLint.ConfigData;

const isFlatConfig = (config: ConfigLike): config is Linter.Config =>
  !Array.isArray(config.plugins);

test('should define configs correctly', () => {
  expect(configs['recommended']).toBeDefined();
  expect(configs['flat/recommended']).toBeDefined();

  expect(isFlatConfig(configs['flat/recommended'])).toBe(true);
  expect(isFlatConfig(configs['recommended'])).toBe(false);
});
