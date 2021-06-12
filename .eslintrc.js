module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    // 'plugin:prettier-vue/recommended',
    // 'plugin:prettier/recommended',
    'prettier',
  ],
  settings: {
    'prettier-vue': {
      SFCBlocks: {
        template: true,
        script: true,
        style: true,
        customBlocks: {
          docs: {
            lang: 'markdown',
          },
          config: {
            lang: 'json',
          },
          module: {
            lang: 'js',
          },
          comments: false,
        },
      },
      usePrettierrc: true,
      // @see https://prettier.io/docs/en/api.html#prettiergetfileinfofilepath-options
      fileInfoOptions: {
        ignorePath: '.testignore',
        withNodeModules: false,
      },
    },
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  // overrides: [
  //   {
  //     files: [
  //       "**/__tests__/*.{j,t}s?(x)",
  //       "**/tests/unit/**/*.spec.{j,t}s?(x)"
  //     ],
  //     env: {
  //       jest: true
  //     }
  //   }
  // ]
};
