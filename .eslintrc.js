module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
    '@nuxtjs/eslint-config-typescript'
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'vue/html-closing-bracket-newline': 'off',
    'space-before-function-paren': 0,
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always'
        }
      }
    ],
    'object-curly-spacing': ['error', 'never']
  }
}
