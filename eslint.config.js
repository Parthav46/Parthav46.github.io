// eslint.config.js
module.exports = [
    {
        ...require('eslint-config-love'),
        files: ['**/*.js', '**/*.ts'],
        ignores: [
            '**/hckrtypr/*',
            'build/*'
        ]
    }
];