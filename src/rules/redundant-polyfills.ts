import {Rule} from 'eslint';
import {getDocsUrl} from '../util/rule-meta.js';
import {closestPackageSatisfiesNodeVersion} from '../util/package-json.js';
import {nativeReplacements} from '../replacements.js';
import {createImportListener} from '../util/imports.js';

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
      ...createImportListener(context, processNode)
    };
  }
};
