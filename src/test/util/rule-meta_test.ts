import * as assert from 'node:assert';
import {test} from 'node:test';
import {
  getDocsUrl,
  getMdnUrl,
  getReplacementsDocUrl
} from '../../util/rule-meta.js';

test('getDocsUrl', async (t) => {
  await t.test('gets the url of a given rule doc', () => {
    assert.equal(
      getDocsUrl('bloop'),
      'https://github.com/43081j/eslint-plugin-assert/blob/main/docs/rules/bloop.md'
    );
  });
});

test('getMdnUrl', async (t) => {
  await t.test('gets the url of a given mdn doc', () => {
    assert.equal(
      getMdnUrl('bloop'),
      'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/bloop'
    );
  });
});

test('getReplacementsDocUrl', async (t) => {
  await t.test('gets the url of a given replacements doc', () => {
    assert.equal(
      getReplacementsDocUrl('bloop'),
      'https://github.com/es-tooling/module-replacements/blob/main/docs/modules/bloop.md'
    );
  });
});
