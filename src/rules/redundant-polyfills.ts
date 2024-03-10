import {Rule} from 'eslint';
import {getDocsUrl} from '../util/rule-meta.js';
import {nativeReplacements} from '../replacements.js';
import {createReplacementListener} from '../util/imports.js';

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
      simpleReplacement:
        '"{{name}}" is redundant within your supported versions of node.' +
        'It can likely be replaced by the natively available ' +
        '"{{replacement}}"',
      nativeReplacement:
        '"{{name}}" is redundant within your supported versions of node.' +
        'It can likely be replaced by the natively available ' +
        '"{{replacement}}" ({{url}})',
      documentedReplacement:
        '"{{name}}" is redundant within your supported versions of node.' +
        'For possible replacements, see {{url}}'
    }
  },
  create: (context) => {
    return {
      ...createReplacementListener(context, nativeReplacements)
    };
  }
};
