import {Rule} from 'eslint';
import {getDocsUrl} from '../util/rule-meta.js';
import {microUtilities} from '../replacements.js';
import {createReplacementListener} from '../util/imports.js';

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
      nativeReplacement:
        '"{{name}}" is a micro-utility which should be replaced with ' +
        '{{replacement}} (native functionality), Read more here: {{url}}',
      documentedReplacement:
        '"{{name}}" is a micro-utility which should be replaced with a ' +
        'lighter alternative. Read more here: {{url}}',
      simpleReplacement:
        '"{{name}}" is a micro-utility which should be replaced with ' +
        'equivalent inline/local logic. {{replacement}}'
    }
  },
  create: (context) => {
    return {
      ...createReplacementListener(context, microUtilities)
    };
  }
};
