const express = require('express');

const Mongoose  = require('mongoose');
var routeur = express.Router();

const Joueur = Mongoose.model('joueurs'); 
const Question = Mongoose.model('Questions');




routeur.get('/', (req, res)=>{// premier
	console.log('premier'); 
	res.render("joueurs/ajoutMiseAjour", {
		viewTitle: "Connexion"

	}); 
}); 
//on crée la route post pour envoyer les données du body dans la base de donnée
routeur.post('/', (req, res)=>{ // deuxieme
	console.log('deuxieme'); 
	enregistreDansBDD(req, res); 
	}); 

	function enregistreDansBDD(req, res){ 
		var joueur = new Joueur(); 
		joueur.Pseudo= req.body.Pseudo;
		joueur.email= req.body.email; 
		joueur.motDePasse= req.body.motDePasse;
		joueur.save((error, _doc) =>{  //docs= data
			if (!error) 
				res.redirect('joueurs/fichierListe'); //fichier route a creer 
		else {
				if(error.name == 'ValidationError'){
					console.log('Error ici:' + Error); 
				gestionErreurEnregistrement(error, req.body); 
				res.render("joueurs/ajoutMiseAjour", {
					viewTitle: "Connexion ",
					joueur: req.body
				});
			}
				else
					console.log('Erreur d\'enregistrement: '+ Error); 
			}
		});
	}






		function gestionErreurEnregistrement(err, body){
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


	routeur.get('/quiz', (_req, res) => {           // if(error){ console.log console.log('il y\'a erreur dans le fetching:'+ Error)}
		Joueur.find((error, ) => {				// else { res.}
			if(error){
				console.log('il y\'a erreur dans le fetching:'+ Error);

			} else {
				res.render('joueurs/quiz');
					
			}
		}); 
	});

	routeur.get('/mongoDB', (req, res)=> {
		Question.find({}, function(error, Questions) {
			if (error){
			console.log('erreur détectée: ' + Error); } else {
			res.render('joueurs/mongoDB', {
				mongoDB: Questions
			}); }
	})
})

	
/*routeur.get('/mongoDB', (req, res) => {
	Question.find({}, function(error, docs) {
		if ( error) console.warn(error); 
		console.warn(docs);
		})
	})*/



	
/*routeur.get('/quiz', (_req, res) => {           // if(error){ console.log console.log('il y\'a erreur dans le fetching:'+ Error)}
		Joueur.find((error, docs) => {				// else { res.}
			if(!error){
				res.render('joueurs/quiz', {
					quiz: docs
				});
			} else { console.log('il y\'a erreur dans le fetching:'+ Error);}
		}); 
	});*/



module.exports = routeur; 