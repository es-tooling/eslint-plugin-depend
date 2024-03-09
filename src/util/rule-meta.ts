/**
 * Generates a standard URL to the docs of a given rule
 * @param {string} name Rule name
 * @return {string}
 */
export function getDocsUrl(name: string): string {
  return `https://github.com/43081j/eslint-plugin-assert/blob/master/docs/rules/${name}.md`;
}
