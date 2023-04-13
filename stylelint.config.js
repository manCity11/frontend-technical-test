const camelCasePattern = '^[a-z]+[a-zA-Z0-9]*$';
const camelCaseRegexp = `/${camelCasePattern}/`;

module.exports = {
  extends: 'stylelint-config-standard-scss',
  plugins: [
    'stylelint-order',
  ],
  ignoreFiles: [
    '**/dist/**',
    '**/node_modules/**',
  ],
  rules: {
    'at-rule-disallowed-list': ['debug'],
    'at-rule-empty-line-before': [
      'always',
      {
        except: [
          'blockless-after-same-name-blockless',
          'first-nested',
        ],
        ignore: ['after-comment', 'inside-block', 'blockless-after-blockless'],
        ignoreAtRules: ['if', 'else'],
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['content', 'each', 'else', 'error', 'extend', 'for', 'function', 'if', 'include', 'mixin', 'return', 'use', 'warn', 'forward', 'at-root'],
      },
    ],
    'at-rule-no-vendor-prefix': true,
    'at-rule-semicolon-space-before': 'never',
    'block-closing-brace-newline-after': [
      'always',
      {
        ignoreAtRules: ['if', 'else'],
      },
    ],
    'block-no-empty': true,
    'color-hex-case': 'lower',
    'color-hex-length': 'long',
    'color-no-invalid-hex': true,
    'color-named': 'never',
    'declaration-bang-space-after': 'never',
    'declaration-bang-space-before': 'always',
    'declaration-block-no-duplicate-properties': true,
    'declaration-block-no-redundant-longhand-properties': true,
    'declaration-block-no-shorthand-property-overrides': null,
    'declaration-block-single-line-max-declarations': 0,
    'declaration-block-trailing-semicolon': 'always',
    'declaration-colon-space-after': 'always-single-line',
    'declaration-colon-space-before': 'never',
    'declaration-empty-line-before': null,
    'declaration-property-value-disallowed-list': [{
      '/^border/': ['none'],
    }],
    'font-family-no-missing-generic-family-keyword': null,
    'function-comma-space-after': 'always-single-line',
    'function-comma-space-before': 'never',
    'function-name-case': ['lower', { ignoreFunctions: [/(^[a-z]|[A-Z])[a-z]*/] }],
    'function-no-unknown': null,
    'function-parentheses-newline-inside': null,
    'function-parentheses-space-inside': 'never',
    'max-line-length': null,
    'max-nesting-depth': [
      7,
      {
        ignoreAtRules: [
          'each',
          'media',
          'supports',
          'include',
        ],
      },
    ],
    'no-descending-specificity': null,
    'no-invalid-position-at-import-rule': [
      true,
      {
        ignoreAtRules: ['use'],
      },
    ],
    'number-leading-zero': 'never',
    'number-no-trailing-zeros': true,
    'order/order': [
      'custom-properties',
      {
        type: 'at-rule',
        name: 'include',
      },
      {
        type: 'at-rule',
        name: 'mixin',
      },
      'declarations',
    ],
    'property-no-unknown': true,
    'scss/at-import-no-partial-leading-underscore': true,
    'scss/at-else-empty-line-before': 'never',
    'scss/at-function-parentheses-space-before': 'never',
    'scss/at-function-pattern': camelCasePattern,
    'scss/at-mixin-parentheses-space-before': 'never',
    'scss/at-mixin-pattern': camelCasePattern,
    'scss/at-rule-no-unknown': true,
    'scss/dollar-variable-empty-line-before': null,
    'scss/dollar-variable-pattern': camelCasePattern,
    'scss/percent-placeholder-pattern': '^[a-z0-9\\-]+$',
    'selector-class-pattern': '^[a-z0-9\\-A-Z_]+$',
    'selector-max-id': 0,
    'selector-list-comma-newline-after': 'always',
    'selector-no-qualifying-type': [
      true,
      {
        ignore: ['attribute'],
      },
    ],
    'selector-pseudo-element-colon-notation': 'single',
    'selector-type-no-unknown': null,
    'shorthand-property-no-redundant-values': true,
    'string-quotes': 'double',
    'value-keyword-case': ['lower', { ignoreKeywords: [camelCaseRegexp, 'TODO'] }],
  },
};
