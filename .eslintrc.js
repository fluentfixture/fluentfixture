module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: [
        'plugin:unicorn/recommended',
        'plugin:import/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier'
    ],
    root: true,
    env: {
        node: true
    },
    rules: {
        quotes: ['error', 'single'],
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/ban-types': 'off',
        'unicorn/no-null': 'off',
        'unicorn/prefer-type-error': 'off',
        'unicorn/no-array-reduce': 'off',
        'unicorn/prevent-abbreviations': 'off',
        'unicorn/no-useless-undefined': 'off',
        'import/no-unresolved': 'off',
        'unicorn/consistent-function-scoping': 'off',
        'import/order': ["error", {"groups": ["builtin", "external", "parent", "sibling", "index"]}]
    },
    ignorePatterns: [
        '.eslintrc.js',
        '.eslintrc.spec.js',
        '.dependency-cruiser.js',
        'commitlint.config.js',
        'tools/**/*.js',
        'packages/**/lib/**'
    ]
};
