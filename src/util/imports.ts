import {Rule} from 'eslint';
import {TSESTree} from '@typescript-eslint/typescript-estree';
import {Replacement} from '../replacements.js';
import {closestPackageSatisfiesNodeVersion} from './package-json.js';
import {getMdnUrl, getReplacementsDocUrl} from './rule-meta.js';
import type {AST as JsonESTree} from 'jsonc-eslint-parser';

export type ImportListenerCallback = (
  context: Rule.RuleContext,
  node: Rule.Node,
  source: string
) => void;

/**
 * Creates a rule listener which listens for import/require calls and
 * calls a callback when one is found
 * @param {Rule.RuleContext} context ESLint context
 * @param {Function} callback Callback to call when an import/require is found
 * @return {Rule.RuleListener}
 */
export function createImportListener(
  context: Rule.RuleContext,
  callback: ImportListenerCallback
): Rule.RuleListener {
  return {
    ImportDeclaration: (node) => {
      if (
        node.source.type !== 'Literal' ||
        typeof node.source.value !== 'string'
      ) {
        return;
      }

      callback(context, node, node.source.value);
    },
    ImportExpression: (node) => {
      if (
        node.source.type !== 'Literal' ||
        typeof node.source.value !== 'string'
      ) {
        return;
      }

      callback(context, node, node.source.value);
    },
    TSImportEqualsDeclaration: (astNode: Rule.Node) => {
      const node = astNode as unknown as TSESTree.TSImportEqualsDeclaration;
      const moduleRef = node.moduleReference;
      if (
        moduleRef.type !== 'TSExternalModuleReference' ||
        moduleRef.expression.type !== 'Literal' ||
        typeof moduleRef.expression.value !== 'string'
      ) {
        return;
      }

      callback(context, astNode, moduleRef.expression.value);
    },
    CallExpression: (node) => {
      const [arg0] = node.arguments;
      if (
        node.callee.type !== 'Identifier' ||
        node.callee.name !== 'require' ||
        arg0.type !== 'Literal' ||
        typeof arg0.value !== 'string'
      ) {
        return;
      }

      callback(context, node, arg0.value);
    }
  };
}

/**
 * Callback used for the replacement listener
 * @param {Rule.RuleContext} context ESLint context
 * @param {Replacement[]} replacements List of replacements
 * @param {Rule.Node} node Node being traversed
 * @param {string} source Module being imported
 * @return {void}
 */
function replacementListenerCallback(
  context: Rule.RuleContext,
  replacements: Replacement[],
  node: Rule.Node,
  source: string
): void {
  const replacement = replacements.find(
    (rep) =>
      rep.moduleName === source || source.startsWith(`${rep.moduleName}/`)
  );

  if (!replacement) {
    return;
  }

  if (replacement.type === 'native') {
    if (
      replacement.nodeVersion &&
      !closestPackageSatisfiesNodeVersion(context, replacement.nodeVersion)
    ) {
      return;
    }
    context.report({
      node,
      messageId: 'nativeReplacement',
      data: {
        name: replacement.moduleName,
        replacement: replacement.replacement,
        url: getMdnUrl(replacement.mdnPath)
      }
    });
  } else if (replacement.type === 'documented') {
    context.report({
      node,
      messageId: 'documentedReplacement',
      data: {
        name: replacement.moduleName,
        url: getReplacementsDocUrl(replacement.docPath)
      }
    });
  } else if (replacement.type === 'simple') {
    context.report({
      node,
      messageId: 'simpleReplacement',
      data: {
        name: replacement.moduleName,
        replacement: replacement.replacement
      }
    });
  } else if (replacement.type === 'none') {
    context.report({
      node,
      messageId: 'noneReplacement',
      data: {
        name: replacement.moduleName
      }
    });
  }
}

const dependencyKeys = ['dependencies', 'devDependencies'];

/**
 * Creates a rule listener for detecting dependencies in a `package.json`
 * file
 * @param {Rule.RuleContext} context ESLint context
 * @param {ImportListenerCallback} callback Listener callback
 * @return {Rule.RuleListener}
 */
export function createPackageJsonListener(
  context: Rule.RuleContext,
  callback: ImportListenerCallback
): Rule.RuleListener {
  return {
    'Program > JSONExpressionStatement > JSONObjectExpression > JSONProperty': (
      astNode: Rule.Node
    ) => {
      const node = astNode as unknown as JsonESTree.JSONProperty;

      if (
        node.key.type === 'JSONLiteral' &&
        typeof node.key.value === 'string' &&
        dependencyKeys.includes(node.key.value) &&
        node.value.type === 'JSONObjectExpression'
      ) {
        for (const prop of node.value.properties) {
          if (
            prop.key.type === 'JSONLiteral' &&
            typeof prop.key.value === 'string'
          ) {
            callback(context, prop as unknown as Rule.Node, prop.key.value);
          }
        }
      }
    }
  };
}

const packageJsonLikePath = /(^|[/\\])package.json$/;

/**
 * Creates a rule listener which finds replacements in imports/requires
 * @param {Rule.RuleContext} context ESLint context
 * @param {Replacement[]} replacements List of replacements
 * @return {Rule.RuleListener}
 */
export function createReplacementListener(
  context: Rule.RuleContext,
  replacements: Replacement[]
): Rule.RuleListener {
  if (packageJsonLikePath.test(context.filename)) {
    return createPackageJsonListener(context, (context, node, name) =>
      replacementListenerCallback(context, replacements, node, name)
    );
  }

  return createImportListener(context, (context, node, source) =>
    replacementListenerCallback(context, replacements, node, source)
  );
}
