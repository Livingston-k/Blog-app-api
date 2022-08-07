'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('categories', [{
                name: 'Node js',
            },
            {
                name: 'Express js',
            },
            {
                name: 'Vue js',
            },
            {
                name: 'React js',
            },
            {
                name: 'React Native',
            },
            {
                name: 'Electron js',
            },
            {
                name: 'Tensorflow js',
            },
            {
                name: 'Livingston-k js',
            },

        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('categories', null, {});
    }
};