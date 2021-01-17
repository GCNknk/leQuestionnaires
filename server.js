require('./modeles/db'); 

const express = require('express'); 


const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');


const joueursControlleur = require('./controllers/joueursControlleur'); 

var app = express(); 

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', runtimeOptions: {allowProtoPropertiesByDefault: true,allowProtoMethodsByDefault: true}, defaultLayout: 'pagedegarde', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public/'));
app.listen(3000, () => {
	console.log('le serveur ecoute: localhost:3000/'); 

}); 

app.use('/joueurs', joueursControlleur); 