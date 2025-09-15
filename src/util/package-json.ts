import {readFileSync} from 'node:fs';
import * as pkg from 'empathic/package';
import type {Rule} from 'eslint';
import semverSatisfies from 'semver/functions/satisfies.js';
import semverLessThan from 'semver/ranges/ltr.js';

/**
 * Gets the node engine constraint from `package.json` if possible
 * @param {Record} packageJson Package to process
 * @return {string | null}
 */
export function getNodeConstraint(
  packageJson: Record<string, unknown>
): string | null {
  const engines = packageJson.engines;

  if (typeof engines !== 'object' || engines === null || !('node' in engines)) {
    return null;
  }

  const nodeVersion = engines.node;

  if (typeof nodeVersion !== 'string') {
    return null;
  }

  return nodeVersion;
}

const packageCache = new WeakMap<
  Rule.RuleContext,
  Record<string, unknown> | null
>();

/**
 * Gets the closest `package.json` for a context
 * @param {Rule.RuleContext} context ESLint context
 * @return {Record | null}
 */
export function getClosestPackage(
  context: Rule.RuleContext
): Record<string, unknown> | null {
  const cachedPackageJson = packageCache.get(context);

  if (cachedPackageJson !== undefined) {
    return cachedPackageJson;
  }

  const packageJsonPath = pkg.up({cwd: context.cwd});
  const packageJson = packageJsonPath
    ? JSON.parse(readFileSync(packageJsonPath, 'utf8'))
    : null;
  packageCache.set(context, packageJson);
  return packageJson;
}

/**
 * Tests whether the closest `package.json` satisfies the specified
 * node version.
 * This will be true if the package's `engines` field has a version range
 * which this version satisfies, or no field at all.
 * @param {Rule.RuleContext} context ESLint context
 * @param {string} version Version to test
 * @return {boolean}
 */
export function closestPackageSatisfiesNodeVersion(
  context: Rule.RuleContext,
  version: string
): boolean {
  const packageJson = getClosestPackage(context);

  if (!packageJson) {
    return true;
  }

  const nodeConstraint = getNodeConstraint(packageJson);

  if (!nodeConstraint) {
    return true;
  }

  return (
    semverLessThan(version, nodeConstraint) ||
    semverSatisfies(version, nodeConstraint)
  );
}
