import type {ESLint, Linter} from 'eslint';
import * as assert from 'node:assert/strict';
import {test} from 'node:test';
import {configs} from '../main.js';

type ConfigLike = Linter.FlatConfig | ESLint.ConfigData;

const isFlatConfig = (config: ConfigLike): config is Linter.FlatConfig =>
  !Array.isArray(config.plugins);

test('configs', async (t) => {
  await t.test('should define configs correctly', () => {
    assert.ok(configs['recommended']);
    assert.ok(configs['flat/recommended']);

    assert.ok(isFlatConfig(configs['flat/recommended']));
    assert.equal(isFlatConfig(configs['recommended']), false);
  });
});
