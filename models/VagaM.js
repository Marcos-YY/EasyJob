const Sequelize = require('sequelize');
const db = require('../db/conexao');

const Vaga = db.define('vaga', {
    titulo: {
        type: Sequelize.STRING,
    },
    descricao: {
        type: Sequelize.STRING,
    },
    salario: {
        type: Sequelize.STRING,
    },
    empresa: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    vaga_nova: {
        type: Sequelize.INTEGER,
    },
});

module.exports = Vaga;