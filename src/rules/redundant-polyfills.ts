import {Rule} from 'eslint';
import {TSESTree} from '@typescript-eslint/typescript-estree';
import {getDocsUrl} from '../util/rule-meta.js';
import {closestPackageSatisfiesNodeVersion} from '../util/package-json.js';
import {nativeReplacements} from '../replacements.js';

/**
 * Processes a given node and import/require source for replacements
 * @param {Rule.RuleContext} context ESLint context
 * @param {Rule.Node} node Node being processed
 * @param {string} source Module being imported
 * @return {void}
 */
function processNode(
  context: Rule.RuleContext,
  node: Rule.Node,
  source: string
): void {
  const replacement = nativeReplacements.find(
    (rep) =>
      rep.moduleName === source || source.startsWith(`${rep.moduleName}/`)
  );

  if (!replacement) {
    return;
  }

  if (
    replacement.nodeVersion &&
    !closestPackageSatisfiesNodeVersion(context, replacement.nodeVersion)
  ) {
    return;
  }

  if (replacement.mdnPath) {
    context.report({
      node,
      messageId: 'redundantWithMdnPath',
      data: {
        name: replacement.moduleName,
        replacement: replacement.replacement,
        mdnPath: replacement.mdnPath
      }
    });
  } else {
    context.report({
      node,
      messageId: 'redundant',
      data: {
        name: replacement.moduleName,
        replacement: replacement.replacement
      }
    });
  }
}

export const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Detects possibly redundant polyfills of natively available ' +
        'functionality',
      url: getDocsUrl('redundant-polyfills')
    },
    schema: [],
    messages: {
      redundant:
        '"{{name}}" is redundant within your supported versions of node.' +
        'It can likely be replaced by the natively available ' +
        '"{{replacement}}"',
      redundantWithMdnPath:
        '"{{name}}" is redundant within your supported versions of node.' +
        'It can likely be replaced by the natively available ' +
        '"{{replacement}}" (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/{{mdnPath}})'
    }
  },
  create: (context) => {
    return {
      ImportDeclaration: (node) => {
        if (
          node.source.type !== 'Literal' ||
          typeof node.source.value !== 'string'
        ) {
          return;
        }

        processNode(context, node, node.source.value);
      },
      ImportExpression: (node) => {
        if (
          node.source.type !== 'Literal' ||
          typeof node.source.value !== 'string'
        ) {
          return;
        }

        processNode(context, node, node.source.value);
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

        processNode(context, astNode, moduleRef.expression.value);
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

        processNode(context, node, arg0.value);
      }
    };
  }
};
