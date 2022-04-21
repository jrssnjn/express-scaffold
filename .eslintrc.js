module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "linebreak-style": ["error", "windows"],
    "no-multiple-empty-lines": 0,
    semi: ["error", "never"],
  },
};
