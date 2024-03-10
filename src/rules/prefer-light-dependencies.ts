import {Rule} from 'eslint';
import {getDocsUrl} from '../util/rule-meta.js';
import {lighterReplacements} from '../replacements.js';
import {createReplacementListener} from '../util/imports.js';

export const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Prefers lighter alternatives over certain dependencies',
      url: getDocsUrl('prefer-light-dependencies')
    },
    schema: [],
    messages: {
      simpleReplacement:
        '"{{name}}" is redundant within your supported versions of node.' +
        'It should be replaced by the natively available ' +
        '"{{replacement}}"',
      nativeReplacement:
        '"{{name}}" is redundant within your supported versions of node.' +
        'It should be replaced by the natively available ' +
        '"{{replacement}}" ({{url}})',
      documentedReplacement:
        '"{{name}}" should be replaced with a lighter alternative.' +
        'For possible replacements, see {{url}}'
    }
  },
  create: (context) => {
    return {
      ...createReplacementListener(context, lighterReplacements)
    };
  }
};
