import {Rule} from 'eslint';
import {TSESTree} from '@typescript-eslint/typescript-estree';

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
