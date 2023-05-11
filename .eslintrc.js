module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: "@babel/eslint-parser", // 修改解析器为 @babel/eslint-parser
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  extends: ["eslint:recommended"],
  rules: {
    // 在这里添加自定义的规则
  },
};
