

var Question = function (conteneurDeQuestions) {
	this.value = {
	  texte: "Question", 
	  reponses: []      
	};
  
	this.reponseChoisie = null; 
	this.html = null;
	this.texteQuestion = null; 
	this.reponseAuxQuestions = null; 
	this.retourDesQuestions = null;
  
	this.value = Object.assign(this.value, conteneurDeQuestions);
  
	this.questionRepondue = ({ detail }) => {
	  this.reponseChoisie = {
		value: detail.reponse,
		html: detail.answerHtml
	  };
	  this.update();
  
	  document.dispatchEvent(
		new CustomEvent("question-answered", {
		  detail: {
			question: this,
			reponse: detail.reponse
		  }
		})
	  );
	};
  
	this.create = function () {
	  this.html = document.createElement("div");
	  this.html.classList.add("question");
  
	  this.texteQuestion = document.createElement("h2");
	  this.texteQuestion.textContent = this.value.text;
  
	  this.reponseAuxQuestions = document.createElement("div");
	  this.reponseAuxQuestions.classList.add("reponses");
  
	  for (var i = 0; i < this.value.reponses.length; i++) {
		const ansObj = this.value.reponses[i];
		var reponse = createAnswer(ansObj);
  
		reponse.onclick = (ev) => {
		  if (this.reponseChoisie !== null) {
			this.reponseChoisie.html.classList.remove("selected");
		  }
  
		  reponse.classList.add("selected");
  
		  this.html.dispatchEvent(
			new CustomEvent("question-answered", {
			  detail: {
				reponse: ansObj,
				answerHtml: reponse
			  }
			})
		  );
		};
  
		this.reponseAuxQuestions.appendChild(reponse);
	  }
  
	  this.retourDesQuestions = document.createElement("div");
	  this.retourDesQuestions.classList.add("question-feedback");
  
	  this.html.appendChild(this.texteQuestion);
	  this.html.appendChild(this.reponseAuxQuestions);
	  this.html.appendChild(this.retourDesQuestions);
  
	  this.html.addEventListener("question-answered", this.questionRepondue);
  
	  return this.html;
	};
  
	this.disable = function () {
	  this.html.classList.add("disabled");
	  this.html.onclick = (ev) => {
		ev.stopPropagation();
	  };
  
	  this.html.removeEventListener("question-answered", this.questionRepondue);
  
	  var reponses = this.html.querySelectorAll(".reponses");
	  for (var i = 0; i < reponses.length; i++) {
		var reponse = reponses[i];
		reponse.onclick = null;
	  }
	};
  
	this.remove = function () {
	  var elemEnfant = this.html.querySelectorAll("*");
	  for (var i = 0; i < elemEnfant.length; i++) {
		const enftSeul = elemEnfant[i];
		this.html.removeChild(enftSeul);
	  }
  
	  this.html.removeEventListener("question-answered", this.questionRepondue);
  
	  this.html.parentNode.removeChild(this.html);
	  this.html = null;
	};
  
	this.update = function () {
	  var retourPositif, retourNegatif;
	  this.html = this.html || document.createElement("div");
  
	  retourPositif = " :) Bonne réponse! ";
	  retourNegatif = "Mauvaise réponse! :( ";
  
	  if (this.reponseChoisie !== null) {
		if (this.reponseChoisie.value.isCorrect) {
		  this.html.classList.add("correct");
		  this.html.classList.remove("incorrect");
		  this.retourDesQuestions.innerHTML = retourPositif;
		} else {
		  this.html.classList.add("incorrect");
		  this.html.classList.remove("correct");
		  this.retourDesQuestions.innerHTML = retourNegatif;
		}
	  }
	};
  
	function createAnswer(obj) {
	  this.value = {
		text: "Answer",
		isCorrect: false
	  };
  
	  this.value = Object.assign(this.value, obj);
  
	  this.html = document.createElement("button");
	  this.html.classList.add("answer");
  
	  this.html.textContent = this.value.text;
  
	  return this.html;
	}
  };
  
  
  
  var modeleDeQuestions = [
	{
	  text: "Quel était le vrai prénom de johnny Hallyday",
	  reponses: [
		{
		  text: "Johnathan (pardi!)",
		  isCorrect: false
		},
		{
		  text: "Michel",
		  isCorrect: true
		},
		{
		  text: "Jean Philippe",
		  isCorrect: true
		}, 
		{
		  text: "Louis Napoléon", 
		  isCorrect: false
		}
	  ]
	},
	{
	  text: "Qui est Quetzalcoalt?",
	  reponses: [
		{
		  text: "L'empereur de l'antartique",
		  isCorrect: false
		},
		{
		  text: "Help you cook amazing cookiesle serpent à plumes",
		  isCorrect: true
		},
		{
		  text: "le dieu soleil",
		  isCorrect: false
		},
		{
		  text: "tout à fait",
		  isCorrect: false
		}
	  ]
	},
	{
	  text: "A quelle tempratrure le plomb fond t-il?",
	  reponses: [
		{
		  text: "725.7 °C",
		  isCorrect: false
		},
		{
		  text: "400.5 °C",
		  isCorrect: false
		},
		{
		  text: "327.5 °C",
		  isCorrect: true
		}, 
		{
		text: "666.66 °C",
		isCorrect: false
		}
	  ]
	},
	{
	  text: "Quelle est la capitale du Lesotho",
	  reponses: [
		{
		  text: "Maseru",
		  isCorrect: true
		},
		{
		  text: "Camberra",
		  isCorrect: false
		},
		{
		  text: "Freetown",
		  isCorrect: false
		},
		{
		  text: "Aberdeen",
		  isCorrect: false
		}
	  ]
	},
	{
	  text: "Qui est Lisa Gherardini?",
	  reponses: [
		{
		  text: "Je ne sais pas",
		  isCorrect: false
		},
		{
		  text: "Elisabeth Taylor",
		  isCorrect: false
		},
		{
		  text: "Mona Lisa",
		  isCorrect: true
		},
		{
		  text: "Lizzo",
		  isCorrect: false
		}
	  ]
	}, 
	{
		text: "Quel club de football a gagné le plus grand nombre de fois la ligue des champions ",
	  reponses: [
		{
		  text: "La mer noire",
		  isCorrect: false
		},
		{
		  text: "l'Olympique de Marseille",
		  isCorrect: false
		},
		{
		  text: "le Milan AC",
		  isCorrect: false
		},
		{
		  text: "le real de Madrid",
		  isCorrect: true
		}
	  ]

	}, 
	{
		text: "Ou se situe le massif du Morvan?",
	  reponses: [
		{
		  text: "près du Pif de Dante",
		  isCorrect: false
		},
		{
		  text: "dans le massif central",
		  isCorrect: false
		},
		{
		  text: "dans le massif armoricain",
		  isCorrect: true
		},
		{
		  text: "En Bourgogne",
		  isCorrect: true
		}
	  ]

	}, 
	{
		text: "En quelle année le roi des Francs (Clovis) est-il mort?",
	  reponses: [
		{
		  text: "Je ne sais pas",
		  isCorrect: false
		},
		{
		  text: "1998",
		  isCorrect: false
		},
		{
		  text: "515",
		  isCorrect: true
		},
		{
		  text: "1200 avant J-C",
		  isCorrect: false
		}
	  ]

	}, 
	{
		text: "Qu'est ce qu'un astromobile?",
	  reponses: [
		{
		  text: "Un vaisseau spatial",
		  isCorrect: false
		},
		{
		  text: "un véhicule qui e déplace en dehors de la terre",
		  isCorrect: true
		},
		{
		  text: "kit de K2000",
		  isCorrect: false
		},
		{
		  text: "la doloréanne",
		  isCorrect: false
		}
	  ]

	}, 
	{
		text: "Quel était le premier studio d'elvis presley?",
	  reponses: [
		{
		  text: "ah ah ",
		  isCorrect: false
		},
		{
		  text: "RCA",
		  isCorrect: false
		},
		{
		  text: "Sun studios",
		  isCorrect: true
		},
		{
		  text: "Motown",
		  isCorrect: false
		}
	  ]

	}
  ];
  
  
  var questions = [];
  var score = 0,
	repondues = 0;
 var conteneurDelappendChild = document.getElementById("questionstube");
  var scoreBoxe = document.getElementById("lescore");
  scoreBoxe = 'Score: ${score}/${modeleDeQuestions.length}';//scorebox.innerhtml
  
  
  function shuffle(arr) {
	for (var i = arr.length - 1; i > 0; i--) {
	  const j = Math.floor(Math.random() * (i + 1));
	  [arr[i], arr[j]] = [arr[j], arr[i]];
	}
  }
  
  shuffle(modeleDeQuestions);
  
  
  for (var i = 0; i < modeleDeQuestions.length; i++) {
	var question = new Question({
	  text: modeleDeQuestions[i].text,
	  reponses: modeleDeQuestions[i].reponses
	});
  
	conteneurDelappendChild.appendChild(question.create());
	questions.push(question);
  }
  
  document.addEventListener("question-answered", ({ detail }) => {
	if (detail.reponse.isCorrect) {
	  score++;
	}
  
	repondues++;
	scoreBox.innerHTML = `Score: ${score}/${questions.length}`;
	detail.question.disable();
  
	if (repondues == questions.length) {
	  setTimeout(function () {
		alert(`Quiz réussi! ton score est: ${score}/${questions.length}`);
	  }, 100);
	}
  });
  
  console.log(questions, modeleDeQuestions);
  