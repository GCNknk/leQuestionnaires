const mongoose = require('mongoose');


// on crée le schema de joueurs et de questions 

var schemaDeJoueurs = new mongoose.Schema({
	
	Pseudo: {
		type: String,
		required: 'ce champ est obligatoire'
        
    },
    email: {
        type: String
    },
    motDePasse: {
		type: String
    }
    
});
schemaDeJoueurs.path('email').validate((val) =>{
	var emailRegex= new RegExp ("^[\\w\\-]+(\\.[\\w\\-]+)*@[\\w\\-]+(\\.[\\w\\-]+)*\\.[\\w\\-]{2,}$", "i"); 
	return emailRegex.test(val); 
}, 'entrez une adresse normale svp'); 

var questionSchema = new mongoose.Schema({
	
	Question: {
		type: String,
		required: true
	}, 
	
	option1: {
		type: String,
		required: true
	},
	option2: {
		type: String,
		required: true
	},
	option3: {
		type: String,
		required: true
	},

});

 
 

//on enregistre le schema dans mongoose
module.exports = mongoose.model('joueurs', schemaDeJoueurs, 'Joueurs'); 
module.exports = mongoose.model('Questions', questionSchema, 'Questions')
