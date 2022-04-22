module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react', '@typescript-eslint', 'jest'],
  rules: {
    'max-len': ['off'],
    indent: ['error', 2, { SwitchCase: 1 }],
    'comma-dangle': ['warn', 'always-multiline'],
    'import/prefer-default-export': ['off'],
    'no-alert': ['off'],
    'no-use-before-define': ['off'],
    'react/prop-types': ['off'],
    'react/display-name': ['off'],
    'react/jsx-props-no-spreading': ['off'],
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    '@typescript-eslint/no-use-before-define': ['error'],
  },
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': ['off'],
      },
    },
    {
      files: ['docs/**/*.jsx', 'docs/**/*.tsx'],
      rules: {
        'react/react-in-jsx-scope': ['off'],
      },
    },
  ],
};
