module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    /**
     * Typescript Eslint 分析器
     * https://git.io/fjdQW
     */
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
    /*********************************
     * Prettier 規則
     ********************************/

    // Prettier 排版錯誤 (警告)
    'prettier/prettier': 'warn',

    /*****************************************
     * Eslint 規則
     * DOC: https://eslint.org/docs/rules
     * 文件: https://cn.eslint.org/docs/rules
     ****************************************/

    camelcase: 'off',

    // 強制處理回調錯誤 (關閉)
    'handle-callback-err': 'off',

    // class 成員需空行 (警告)
    'lines-between-class-members': ['warn'],

    // 未使用過的變量 (警告)
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',

    // console (只在 development 允許)
    'no-console':
      process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // debugger (只在 development 允許)
    'no-debugger':
      process.env.NODE_ENV === 'production' ? 'error' : 'off',

    /***********************************
     * Vue Eslint 規則
     * https://eslint.vuejs.org/rules/
     **********************************/

    // Vue script, 未使用的組件 (警告)
    'vue/no-unused-components': 'warn',

    // Vue script, Prop 定義類型 (關閉，不一定要定義)
    'vue/require-prop-types': 'off',

    // Vue template, 未使用的variables (錯誤)
    'vue/no-unused-vars': 'warn',

    // 不使用 v-html (關閉)
    'vue/no-v-html': 'off',

    // Vue template, HTML Tag 關閉規則 (警告)
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
