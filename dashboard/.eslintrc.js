module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'plugin:react/recommended',
        'standard',
        'plugin:react/jsx-runtime'
        // 'eslint:recommended'
    ],
    overrides: [
    ],
    parserOptions: {
        // ecmaVersion: 'latest'
        sourceType: 'module'
    },
    plugins: [
        'react'
    ],
    rules: {
        indent: [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        quotes: [
            'error',
            'single'
        ],
        semi: [
            'error',
            'always'
        ],
        'brace-style': [
            'error',
            '1tbs'
        ],
        'lines-between-class-members': [
            'error',
            'always'
        ],
        'space-in-parens': [
            'error',
            'never'
        ],
        'space-before-blocks': [
            'error',
            'always'
        ],
        'padded-blocks': [
            'error',
            'never'
        ],
        curly: [
            'error',
            'all'
        ],
        'comma-spacing': [
            'error',
            {
                before: false,
                after: true
            }
        ],
        'keyword-spacing': [
            'error',
            {
                after: true
            }
        ],
        'semi-spacing': [
            'error',
            {
                before: false,
                after: true
            }
        ],
        'no-multiple-empty-lines': 'error',
        'no-trailing-spaces': 'error',
        camelcase: 'error',
        'space-infix-ops': 'error',
        'no-console': 2
    }
};
