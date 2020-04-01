module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },

  plugins: ['prettier', '@typescript-eslint'],
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  globals: {
    $: 'readonly',
    gapi: 'readonly',
    grecaptcha: 'readonly'
  },
  ignorePatterns: ['./plugins/bootstrap/js'],
  rules: {
    'prettier/prettier': 'warn',
    camelcase: 'off',
    'handle-callback-err': 'off',
    'lines-between-class-members': ['warn'],
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-console':
      process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger':
      process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-unused-components': 'warn',
    'vue/require-prop-types': 'off',
    'vue/no-unused-vars': 'warn',
    'vue/no-v-html': 'off',
    'vue/html-self-closing': [
      'warn',
      {
        html: {
          void: 'always',
          normal: 'any',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ]
  }
}
