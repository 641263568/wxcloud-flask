/*
 * @Author: your name
 * @Date: 2021-09-06 09:59:48
 * @LastEditTime: 2021-11-24 11:55:53
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \iov-web\.eslintrc.js
 */
 module.exports = {
    // extends: [require.resolve('@umijs/fabric/dist/eslint')],
    globals: {
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
      page: true,
      REACT_APP_ENV: true,
    },
    rules: {
      'no-debugger': process.env.NODE_ENV === 'prod' ? 2 : 0, // 打包时禁止debugger
      'no-await-in-loop': 2, // 禁止在循环中出现 await
      'no-console': process.env.NODE_ENV === 'prod' ? 1 : 0, //	禁用 console
      'no-dupe-args': 1, // 禁止 function 定义中出现重名参数
      'no-dupe-keys': 1, // 禁止对象字面量中出现重复的 key
      'no-duplicate-case': 1, // 禁止出现重复的 case 标签
      'no-extra-semi': 1, // 禁止不必要的分号
      'no-func-assign': 2, // 禁止对 function 声明重新赋值
      'no-obj-calls': 1, // 禁止把全局对象作为函数调用
      'no-unexpected-multiline': 2, // 	禁止出现令人困惑的多行表达式
      'no-unreachable': 1, // 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
      'no-unsafe-negation': 1, //	 禁止对关系运算符的左操作数使用否定操作符
      'valid-typeof': 1, // 强制 typeof 表达式与有效的字符串进行比较
      'no-restricted-globals': 0,
      'no-underscore-dangle': 0,
    },
    parserOptions: {
      ecmaVersion: 7,
      sourceType: 'module',
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
  };
  