import globals from 'globals';
import js from '@eslint/js';

export default [
    js.configs.recommended, // Coloque o recommended primeiro
    {
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.node,
        },
        rules: {
            indent: ['error', 4],
            /* 'linebreak-style': ['error', 'windows'], */
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
            'no-unused-vars': 'off', // Certifique-se de que esta regra está definida corretamente
        },
    },
]; 