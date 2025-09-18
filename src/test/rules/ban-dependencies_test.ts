import {rule} from '../../rules/ban-dependencies.js';
import {RuleTester} from 'eslint';
import {getMdnUrl, getReplacementsDocUrl} from '../../util/rule-meta.js';
import * as tseslintParser from '@typescript-eslint/parser';
import * as jsonParser from 'jsonc-eslint-parser';

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      sourceType: 'module',
      ecmaVersion: 2022
    }
  }
});

ruleTester.run('ban-dependencies', rule, {
  valid: [
    'const foo = 303;',
    {
      code: `import foo = require('unknown-module');`,
      languageOptions: {
        parser: tseslintParser
      }
    },
    {
      code: `import foo from 'unknown-module';`
    },
    {
      code: `const foo = require('unknown-module');`
    },
    {
      code: `
        const moduleName = 'is-' + 'number';
        require(moduleName);
      `
    },
    {
      code: `
        const moduleName = 'is-' + 'number';
        await import(moduleName);
      `
    },
    {
      code: `const foo = require('is-number');`,
      options: [
        {
          presets: []
        }
      ]
    },
    {
      code: `import foo from 'is-nan';`,
      options: [
        {
          presets: ['native'],
          allowed: ['is-nan']
        }
      ]
    },
    {
      code: `import foo from 'oogabooga';`,
      options: [
        {
          modules: ['oogabooga'],
          allowed: ['oogabooga']
        }
      ]
    },
    {
      code: `{
        "dependencies": {
          "unknown-module": "^1.0.0"
        }
      }`,
      filename: 'package.json',
      languageOptions: {
        parser: jsonParser
      }
    },
    {
      code: `{
        "dependencies": {
          "npm-run-all": "^1.0.0"
        }
      }`,
      filename: 'not-a-package.json',
      languageOptions: {
        parser: jsonParser
      }
    },
    {
      code: `{
        "not-dependencies": {
          "some-other-nonsense": 123
        }
      }`,
      filename: 'package.json',
      languageOptions: {
        parser: jsonParser
      }
    }
  ],

  invalid: [
    {
      code: `const foo = require('is-number');`,
      errors: [
        {
          line: 1,
          column: 13,
          messageId: 'simpleReplacement',
          data: {
            name: 'is-number',
            replacement: `Use typeof v === "number" || (typeof v === "string" && Number.isFinite(+v))`
          }
        }
      ]
    },
    {
      code: `import foo from 'is-number';`,
      errors: [
        {
          line: 1,
          column: 1,
          messageId: 'simpleReplacement',
          data: {
            name: 'is-number',
            replacement: `Use typeof v === "number" || (typeof v === "string" && Number.isFinite(+v))`
          }
        }
      ]
    },
    {
      code: `const foo = await import('is-number');`,
      errors: [
        {
          line: 1,
          column: 19,
          messageId: 'simpleReplacement',
          data: {
            name: 'is-number',
            replacement: `Use typeof v === "number" || (typeof v === "string" && Number.isFinite(+v))`
          }
        }
      ]
    },
    {
      code: `import foo = require('is-number');`,
      languageOptions: {
        parser: tseslintParser
      },
      errors: [
        {
          line: 1,
          column: 1,
          messageId: 'simpleReplacement',
          data: {
            name: 'is-number',
            replacement: `Use typeof v === "number" || (typeof v === "string" && Number.isFinite(+v))`
          }
        }
      ]
    },
    {
      code: `import foo from 'object.entries';`,
      errors: [
        {
          line: 1,
          column: 1,
          messageId: 'nativeReplacement',
          data: {
            name: 'object.entries',
            replacement: 'Object.entries',
            url: getMdnUrl('Global_Objects/Object/entries')
          }
        }
      ]
    },
    {
      code: `import foo from 'npm-run-all';`,
      errors: [
        {
          line: 1,
          column: 1,
          messageId: 'documentedReplacement',
          data: {
            name: 'npm-run-all',
            url: getReplacementsDocUrl('npm-run-all')
          }
        }
      ]
    },
    {
      code: `import foo from 'oogabooga';`,
      options: [
        {
          modules: ['oogabooga']
        }
      ],
      errors: [
        {
          line: 1,
          column: 1,
          messageId: 'noneReplacement',
          data: {
            name: 'oogabooga'
          }
        }
      ]
    },
    {
      code: `import foo from 'object-is';`,
      options: [
        {
          presets: ['native'],
          allowed: ['is-nan']
        }
      ],
      errors: [
        {
          line: 1,
          column: 1,
          messageId: 'nativeReplacement',
          data: {
            name: 'object-is',
            replacement: 'Object.is',
            url: getMdnUrl('Global_Objects/Object/is')
          }
        }
      ]
    },
    {
      code: `import foo from 'oogabooga';`,
      options: [
        {
          modules: ['oogabooga'],
          allowed: ['foo']
        }
      ],
      errors: [
        {
          line: 1,
          column: 1,
          messageId: 'noneReplacement',
          data: {
            name: 'oogabooga'
          }
        }
      ]
    },
    {
      code: `{
        "dependencies": {
          "npm-run-all": "^1.0.0"
        }
      }`,
      filename: 'package.json',
      languageOptions: {
        parser: jsonParser
      },
      errors: [
        {
          line: 3,
          column: 11,
          messageId: 'documentedReplacement',
          data: {
            name: 'npm-run-all',
            url: getReplacementsDocUrl('npm-run-all')
          }
        }
      ]
    }
  ]
});
