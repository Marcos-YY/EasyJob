const express = require('express')
const exphbs = require('express-handlebars');//tp engine
const app = express();
const porta = 3000;
const db = require('./db/conexao')
const bodyParser = require('body-parser')
const Vaga = require('./models/VagaM')
const path = require('path')
const sequelize = require('sequelize')
const Op = sequelize.Op; //pacote para busca
const { urlencoded } = require('body-parser')
const { engine } = require('express-handlebars');


app.listen(porta, () => { console.log(`Rodando na porta ${porta}`) })

//conexao com banco
db
    .authenticate()
    .then(() => { console.log('conectado com sucesso') })
    .catch(err => { console.log('nao conectou', err) });

//passando o body como parametro
app.use(urlencoded({ extended: false }));

//diretorio css
app.use(express.static(path.join(__dirname, '/public')))

//handle bars (diretório base)
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//rota
app.get('/', (req, res) => {

    let busca = req.query.busca;
    let query = '%' + busca + '%'

    if (!busca) {
        Vaga.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        }).then(vagas => {
            res.render('index.handlebars', {
                vagas
            });
        }).catch(err => console.log(err));
    } else {
        Vaga.findAll({
            where: { titulo: { [Op.like]: query } },
            order: [
                ['createdAt', 'DESC']
            ]
        }).then(vagas => {
            res.render('index.handlebars', {
                vagas, busca
            });
        })
    }


})


//rota das vagas
app.use('/vagaR', require('./routers/vagaR'));