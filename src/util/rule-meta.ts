/**
 * Generates a standard URL to the docs of a given rule
 * @param {string} name Rule name
 * @return {string}
 */
export function getDocsUrl(name: string): string {
  return `https://github.com/43081j/eslint-plugin-assert/blob/main/docs/rules/${name}.md`;
}

/**
 * Generates a URL for the given path on MDN
 * @param {string} path Docs path
 * @return {string}
 */
export function getMdnUrl(path: string): string {
  return `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/${path}`;
}

/**
 * Generates a URL for module-replacements documentation for a given path
 * @param {string} path Docs path
 * @return {string}
 */
export function getReplacementsDocUrl(path: string): string {
  return `https://github.com/es-tooling/module-replacements/blob/main/docs/modules/${path}.md`;
}
