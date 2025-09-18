import {describe, expect, test} from 'vitest';
import {readFile} from 'node:fs/promises';
import * as path from 'node:path';
import type {Rule} from 'eslint';
import {
  getNodeConstraint,
  getClosestPackage,
  closestPackageSatisfiesNodeVersion
} from '../../util/package-json.js';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('getNodeConstraint', () => {
  test('null when no engines object', () => {
    expect(getNodeConstraint({})).toBeNull();
  });

  test('null if engines is null', () => {
    expect(getNodeConstraint({engines: null})).toBeNull();
  });

  test('null if node version non-string', () => {
    expect(
      getNodeConstraint({
        engines: {
          node: 808
        }
      })
    ).toBeNull();
  });

  test('returns node version', () => {
    expect(
      getNodeConstraint({
        engines: {
          node: '1.2.3'
        }
      })
    ).toBe('1.2.3');
  });
});

describe('getClosestPackage', () => {
  test('gets closest package.json', async () => {
    const cwd = path.join(__dirname, '../../../test/fixtures/simple-package');
    const packageJson = JSON.parse(
      await readFile(path.join(cwd, 'package.json'), 'utf8')
    );
    const filename = path.join(cwd, 'foo.js');
    const context = {
      cwd,
      filename
    } as Rule.RuleContext;

    expect(getClosestPackage(context)).toStrictEqual(packageJson);
  });
});

describe('closestPackageSatisfiesNodeVersion', () => {
  test('true if package has matching version', () => {
    const cwd = path.join(__dirname, '../../../test/fixtures/simple-package');
    const filename = path.join(cwd, 'foo.js');
    const context = {
      cwd,
      filename
    } as Rule.RuleContext;

    expect(closestPackageSatisfiesNodeVersion(context, '10.9.8')).toBe(true);
  });

  test('true if package has range above version', () => {
    const cwd = path.join(__dirname, '../../../test/fixtures/simple-package');
    const filename = path.join(cwd, 'foo.js');
    const context = {
      cwd,
      filename
    } as Rule.RuleContext;

    expect(closestPackageSatisfiesNodeVersion(context, '1.2.3')).toBe(true);
  });

  test('false if package has no matching version', () => {
    const cwd = path.join(__dirname, '../../../test/fixtures/simple-package');
    const filename = path.join(cwd, 'foo.js');
    const context = {
      cwd,
      filename
    } as Rule.RuleContext;

    expect(closestPackageSatisfiesNodeVersion(context, '11.10.9')).toBe(false);
  });

  test('true if no package found', () => {
    const cwd = '/';
    const filename = path.join(cwd, 'foo.js');
    const context = {
      cwd,
      filename
    } as Rule.RuleContext;

    expect(closestPackageSatisfiesNodeVersion(context, '10.9.8')).toBe(true);
  });

  test('true if no node constraint', () => {
    const cwd = path.join(__dirname, '../../../test/fixtures/no-engines');
    const filename = path.join(cwd, 'foo.js');
    const context = {
      cwd,
      filename
    } as Rule.RuleContext;

    expect(closestPackageSatisfiesNodeVersion(context, '10.9.8')).toBe(true);
  });
});
