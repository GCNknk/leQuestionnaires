require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config({path:'./.env'});
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
require('./modeles/questions.modele'); 
require('./.env');
const cors = require('cors'); 


const joueursControlleur = require('./controllers/joueursControlleur'); 



var app = express(); 

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(cors());
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', runtimeOptions: {allowProtoPropertiesByDefault: true,allowProtoMethodsByDefault: true}, defaultLayout: 'pagedegarde', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public/'));


const PORT= process.env.PORT || 3001; 

mongoose.connect(connexionUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },()=>console.log('MongoConnecté')); try {

	app.listen(process.env.PORT || 3001, ()=> console.log(`le serveur écoute au port: ${PORT}`));
	
} catch (error) { console.log('error.message')};

app.get('/', (req, res)=>{
	res.send('bienvenue jeune developpeur');
});


app.use('/joueurs', joueursControlleur); 
