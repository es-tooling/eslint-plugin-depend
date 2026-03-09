import {describe, expect, test} from 'vitest';
import {
  getDocsUrl,
  getMdnUrl,
  getReplacementsDocUrl
} from '../../util/rule-meta.js';

describe('getDocsUrl', () => {
  test('gets the url of a given rule doc', () => {
    expect(getDocsUrl('ban-dependencies')).toEqual(
      'https://github.com/es-tooling/eslint-plugin-depend/blob/main/docs/rules/ban-dependencies.md'
    );
  });
});

describe('getMdnUrl', () => {
  test('gets the url of a given mdn doc', () => {
    expect(getMdnUrl('Global_Objects/Date/now')).toEqual(
      'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now'
    );
  });
});

describe('getReplacementsDocUrl', () => {
  test('gets the url of a given replacements doc', () => {
    expect(getReplacementsDocUrl('dotenv')).toEqual(
      'https://e18e.dev/docs/replacements/dotenv.html'
    );
  });
});
