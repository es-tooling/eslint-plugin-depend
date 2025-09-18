import type {Rule} from 'eslint';
import {getDocsUrl} from '../util/rule-meta.js';
import {
  microUtilsReplacements,
  preferredReplacements,
  nativeReplacements,
  type ModuleReplacement
} from 'module-replacements';
import {createReplacementListener} from '../util/imports.js';

interface BanDependenciesOptions {
  presets?: string[];
  modules?: string[];
  allowed?: string[];
}

const availablePresets: Record<string, ModuleReplacement[]> = {
  microutilities: microUtilsReplacements.moduleReplacements,
  native: nativeReplacements.moduleReplacements,
  preferred: preferredReplacements.moduleReplacements
};

const defaultPresets = ['microutilities', 'native', 'preferred'];

export const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Bans a list of dependencies from being used',
      url: getDocsUrl('ban-dependencies')
    },
    schema: [
      {
        type: 'object',
        properties: {
          presets: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          modules: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          allowed: {
            type: 'array',
            items: {
              type: 'string'
            }
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      nativeReplacement:
        '"{{name}}" should be replaced with native functionality. ' +
        'You can instead use {{replacement}}. Read more here: {{url}}',
      documentedReplacement:
        '"{{name}}" should be replaced with an alternative package. ' +
        'Read more here: {{url}}',
      simpleReplacement:
        '"{{name}}" should be replaced with inline/local logic.' +
        '{{replacement}}',
      noneReplacement:
        '"{{name}}" is a banned dependency. An alternative should be used.'
    }
  },
  create: (context) => {
    const options = context.options[0] as BanDependenciesOptions | undefined;
    const replacements: ModuleReplacement[] = [];
    const presets = options?.presets ?? defaultPresets;
    const modules = options?.modules;
    const allowed = new Set(options?.allowed ?? []);

    for (const preset of presets) {
      const presetReplacements = availablePresets[preset];
      if (presetReplacements) {
        for (const rep of presetReplacements) {
          if (!allowed.has(rep.moduleName)) {
            replacements.push(rep);
          }
        }
      }
    }

    if (modules) {
      for (const mod of modules) {
        if (!allowed.has(mod)) {
          replacements.push({
            type: 'none',
            moduleName: mod
          });
        }
      }
    }

    return {
      ...createReplacementListener(context, replacements)
    };
  }
};
