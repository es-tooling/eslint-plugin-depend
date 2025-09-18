import {describe, expect, test} from 'vitest';
import {
  getDocsUrl,
  getMdnUrl,
  getReplacementsDocUrl
} from '../../util/rule-meta.js';

describe('getDocsUrl', () => {
  test('gets the url of a given rule doc', () => {
    expect(getDocsUrl('bloop')).toEqual(
      'https://github.com/es-tooling/eslint-plugin-depend/blob/main/docs/rules/bloop.md'
    );
  });
});

describe('getMdnUrl', () => {
  test('gets the url of a given mdn doc', () => {
    expect(getMdnUrl('bloop')).toEqual(
      'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/bloop'
    );
  });
});

describe('getReplacementsDocUrl', () => {
  test('gets the url of a given replacements doc', () => {
    expect(getReplacementsDocUrl('bloop')).toEqual(
      'https://github.com/es-tooling/module-replacements/blob/main/docs/modules/bloop.md'
    );
  });
});
