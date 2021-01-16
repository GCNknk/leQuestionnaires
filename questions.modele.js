const mongoose = require('mongoose');

// on crée le schema de questions 

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
}, 'entre une adresse normale svp'); 

var questionSchema = new mongoose.Schema({

	question: {
		type: String,
		required: true
	}, 
	
	reponse1: {
		type: String,
		required: true
	},
	reponse2: {
		type: String,
		required: true
	},
	reponse3: {
		type: String,
		required: true
	},
	reponse4: {
		type: String,
		required: true
	}
});

//on enregistre le schema dans mongoose
mongoose.model('joueurs', schemaDeJoueurs); 
mongoose.model('Questions', questionSchema);
