import {Rule} from 'eslint';
import {getDocsUrl} from '../util/rule-meta.js';
import {microUtilities} from '../replacements.js';
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
  const replacement = microUtilities.find(
    (rep) =>
      rep.moduleName === source || source.startsWith(`${rep.moduleName}/`)
  );

  if (!replacement) {
    return;
  }

  context.report({
    node,
    messageId: 'avoid',
    data: {
      name: replacement.moduleName,
      replacement: replacement.replacement
    }
  });
}

export const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Detects possibly redundant micro-utilities, preferring' +
        'local/inline functionality instead.',
      url: getDocsUrl('avoid-micro-utilities')
    },
    schema: [],
    messages: {
      avoid:
        '"{{name}}" is a micro-utility which should be replaced with ' +
        'equivalent inline/local logic. {{replacement}}'
    }
  },
  create: (context) => {
    return {
      ...createImportListener(context, processNode)
    };
  }
};
