import * as assert from 'node:assert';
import {readFile} from 'node:fs/promises';
import * as path from 'node:path';
import {test} from 'node:test';
import type {Rule} from 'eslint';
import {
  getNodeConstraint,
  getClosestPackage,
  closestPackageSatisfiesNodeVersion
} from '../../util/package-json.ts';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test('getNodeConstraint', async (t) => {
  await t.test('null when no engines object', () => {
    assert.equal(getNodeConstraint({}), null);
  });

  await t.test('null if engines is null', () => {
    assert.equal(getNodeConstraint({engines: null}), null);
  });

  await t.test('null if node version non-string', () => {
    assert.equal(
      getNodeConstraint({
        engines: {
          node: 808
        }
      }),
      null
    );
  });

  await t.test('returns node version', () => {
    assert.equal(
      getNodeConstraint({
        engines: {
          node: '1.2.3'
        }
      }),
      '1.2.3'
    );
  });
});

test('getClosestPackage', async (t) => {
  await t.test('gets closest package.json', async () => {
    const cwd = path.join(__dirname, '../../../test/fixtures/simple-package');
    const packageJson = JSON.parse(
      await readFile(path.join(cwd, 'package.json'), 'utf8')
    );
    const filename = path.join(cwd, 'foo.js');
    const context = {
      cwd,
      filename
    } as Rule.RuleContext;

    assert.deepEqual(getClosestPackage(context), packageJson);
  });
});

test('closestPackageSatisfiesNodeVersion', async (t) => {
  await t.test('true if package has matching version', () => {
    const cwd = path.join(__dirname, '../../../test/fixtures/simple-package');
    const filename = path.join(cwd, 'foo.js');
    const context = {
      cwd,
      filename
    } as Rule.RuleContext;

    assert.equal(closestPackageSatisfiesNodeVersion(context, '10.9.8'), true);
  });

  await t.test('true if package has range above version', () => {
    const cwd = path.join(__dirname, '../../../test/fixtures/simple-package');
    const filename = path.join(cwd, 'foo.js');
    const context = {
      cwd,
      filename
    } as Rule.RuleContext;

    assert.equal(closestPackageSatisfiesNodeVersion(context, '1.2.3'), true);
  });

  await t.test('false if package has no matching version', () => {
    const cwd = path.join(__dirname, '../../../test/fixtures/simple-package');
    const filename = path.join(cwd, 'foo.js');
    const context = {
      cwd,
      filename
    } as Rule.RuleContext;

    assert.equal(closestPackageSatisfiesNodeVersion(context, '11.10.9'), false);
  });

  await t.test('true if no package found', () => {
    const cwd = '/';
    const filename = path.join(cwd, 'foo.js');
    const context = {
      cwd,
      filename
    } as Rule.RuleContext;

    assert.equal(closestPackageSatisfiesNodeVersion(context, '10.9.8'), true);
  });

  await t.test('true if no node constraint', () => {
    const cwd = path.join(__dirname, '../../../test/fixtures/no-engines');
    const filename = path.join(cwd, 'foo.js');
    const context = {
      cwd,
      filename
    } as Rule.RuleContext;

    assert.equal(closestPackageSatisfiesNodeVersion(context, '10.9.8'), true);
  });
});
