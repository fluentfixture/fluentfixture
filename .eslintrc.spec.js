const baseConfig = require('./.eslintrc');

module.exports = {
    ...baseConfig,
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module'
    },
    rules: {
        ...baseConfig.rules,
        '@typescript-eslint/no-empty-function': 'off',
        'unicorn/no-array-callback-reference': 'off'
  }
};
