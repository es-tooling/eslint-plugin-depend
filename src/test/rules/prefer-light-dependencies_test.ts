import {rule} from '../../rules/prefer-light-dependencies.js';
import {RuleTester} from 'eslint';
import {getReplacementsDocUrl} from '../../util/rule-meta.js';

const ruleTester = new RuleTester({
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2022
  }
});

const tseslintParser = require.resolve('@typescript-eslint/parser');

ruleTester.run('prefer-light-dependencies', rule, {
  valid: [
    'const foo = 303;',
    {
      code: `import foo = require('unknown-module');`,
      parser: tseslintParser
    },
    {
      code: `import foo from 'unknown-module';`
    },
    {
      code: `const foo = require('unknown-module');`
    },
    {
      code: `
        const moduleName = 'npm-run-' + 'all';
        require(moduleName);
      `
    },
    {
      code: `
        const moduleName = 'npm-run-' + 'all';
        await import(moduleName);
      `
    }
  ],

  invalid: [
    {
      code: `const foo = require('npm-run-all');`,
      errors: [
        {
          line: 1,
          column: 13,
          messageId: 'documentedReplacement',
          data: {
            name: 'npm-run-all',
            url: getReplacementsDocUrl('npm-run-all')
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
      code: `const foo = await import('npm-run-all');`,
      errors: [
        {
          line: 1,
          column: 19,
          messageId: 'documentedReplacement',
          data: {
            name: 'npm-run-all',
            url: getReplacementsDocUrl('npm-run-all')
          }
        }
      ]
    },
    {
      code: `import foo = require('npm-run-all');`,
      parser: tseslintParser,
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
    }
  ]
});
