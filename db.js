
const mongoose = require ('mongoose');
require('./questions.modele');


mongoose.connect( 'mongodb+srv://David:davidtheDev@quiz.hl0xw.mongodb.net/Quiz?retryWrites=true&w=majority',
 { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false } , (Error)=> {

 if (! Error){ console.log('connection avec mongo reussie')} else { console.log('pas de connection:'+ Error)}
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

	