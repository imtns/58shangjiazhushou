module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  globals: {
    globalData:true,
    getSystemInfo:true,
    getCurrentPages: true,
    getApp:true,
    wx: true,
    Page: true,
    Component:true,
    requirePlugin: true,
  },
  extends: 'airbnb-base',
  plugins: [
    'html'
  ],
  settings: {
    "import/resolver": {
      "node": {
        "extensions": [
          ".js",
          ".wpy"
        ]
      }
    },
    'html/html-extensions': ['.html', '.wpy']
  },
  'rules': {
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
    "no-param-reassign": 0,
    'linebreak-style': 0,
    'indent': [2, 4, {"SwitchCase": 1}],
    'max-len': [2, 300, 4, {"ignoreUrls": true}],
    'radix': ['error', 'as-needed'],
    'no-bitwise': ['error', { 'allow': ['~'] }],
    'object-shorthand': ['error', 'methods'],
    'no-unused-expressions': ["error", { "allowShortCircuit": true }],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': 0,
    'space-before-function-paren': 0,
    'class-methods-use-this': 0,
    'prefer-destructuring': 0,
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'wpy': 'never'
    }]
  }
}
