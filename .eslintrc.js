module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  parser: "babel-eslint",
  extends: "airbnb",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2019,
  },
  plugins: [
    'react',
  ],
  rules: {
    "no-console": "off",
    "linebreak-style": ["error", "windows"],
    "no-restricted-syntax": 0,
  },
};
