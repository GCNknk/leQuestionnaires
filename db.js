const mongoose = require('mongoose');
const express= require('express'); 
const app = express(); 
const dotenv = require('dotenv').config({path:'../.env'});
require('./questions.modele');
 require('../.env');
 require('../server'); 


mongoose.connect(ACCESALABDD, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false })
.then(() => console.log('connection à MongoDB est ok'))
.catch((error)=> {
	return console.log(error.message);
}); 

//mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser:true, useUnifiedTopology: true, } )

/*mongoose.connect('mongodb+srv://David:davidtheDev@quiz.hl0xw.mongodb.net/Quiz?retryWrites=true&w=majority', { 
	 useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false}), () => console.log('connecté à mongo');
	 
	 if(Error){	
	 }
  else { console.log('non connecté : '+ Error)} 'mongodb://localhost:27017/questionsDB'*/


/*Badass.find({}, function(error, Questions) {
	if ( error) console.warn(error); 
	console.warn(Questions);
	});*/

	
