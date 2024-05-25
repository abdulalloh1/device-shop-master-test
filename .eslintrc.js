module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-essential',
        '@vue/typescript/recommended',
        'prettier',
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        'vue/no-multiple-template-root': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'on',
        '@typescript-eslint/no-empty-function': 'on',
        '@typescript-eslint/semicolon': 'on',
    },
};
