const express = require('express');
const { error, data } = require('jquery');
const Mongoose  = require('mongoose');
var routeur = express.Router();
const Joueur = Mongoose.model('joueurs'); 
const Question = Mongoose.model('Questions');




routeur.get('/', (req, res)=>{// premier
	console.log('premier'); 
	res.render("joueurs/ajoutMiseAjour", {
		viewTitle: "Connection"

	}); 
}); 
//on crée la route post pour envoyer les données du body dans la base de donnée
routeur.post('/', (req, res)=>{ // deuxieme
	console.log('deuxiemme'); 
	enregistreDansBDD(req, res); 
	}); 

	function enregistreDansBDD(req, res){ 
		var joueur = new Joueur(); 
		joueur.Pseudo= req.body.Pseudo;
		joueur.email= req.body.email; 
		joueur.motDePasse= req.body.motDePasse;
		joueur.save((error, _doc) =>{
			if (!error) 
				res.redirect('joueurs/fichierListe'); //fichier route a creer 
			 else {
				if(error.name == 'ValidationError'){
				handleValidationError(error, req.body); 
				res.render("joueurs/ajoutMiseAjour", {
					viewTitle: "Connection ",
					joueur: req.body
				});
			}
				else
					console.log('Erreur d\'enregistrement: '+ Error); 
			}
		});
	}






		function handleValidationError(err, body){
			for(field in err.errors) 
			{
				switch(err.errors[field].path){
					case 'Pseudo': 
						body['PseudoError']= err.errors[field].message; 
						break; 
					case 'email': 
						body['emailError'] = err.errors[field].message; 
						break; 
					default: 
						break; 

				}
		}
	}
	
	
routeur.get('/fichierListe', (_req, res) => {		//res.json('La liste sera ici'); 3eme ici //il faut une route pour afficher.
			res.render('joueurs/fichierListe');
			});


	routeur.get('/quiz', (_req, res) => {
		Joueur.find((error, docs) => {
			if(!error){
				res.render('joueurs/quiz', {
					quiz: docs
				});
			} else { console.log('il y\'a erreur dans le fetching:'+ Error);}
		}); 
	});


	
/*routeur.get('/mongoDB', (req, res) => {
	Question.find((err,docs) => {
		if(! err){
			res.render("joueurs/mongoDB", {
					mongoDB: docs
			});
		} else {console.log('encore une erreur:'+ Error); }
	});

});*/
	



module.exports = routeur; 