const express = require('express');
const router = express.Router();
const Vaga = require('../models/VagaM');

//pagina de add vaga
router.get('/add', (req, res) => {
    res.render('add.handlebars')
})


//detalhe da vaga pelo id
router.get('/detalhe/:id', (req, res) => Vaga.findOne({
    where: { id: req.params.id }
}).then(vaga => {
    res.render('detalhe', {
        vaga
    })
}).catch(err => console.log(err)))


//adicionando vaga via post
router.post('/add', (req, res) => {

    let { titulo, descricao, salario, empresa, email, vaga_nova } = req.body;

    //inserir
    Vaga.create({
        titulo,
        descricao,
        salario,
        empresa,
        email,
        vaga_nova
    }).then(() => res.redirect('/'))
        .catch(err => console.log("o erro foi: ", err))
})

module.exports = router