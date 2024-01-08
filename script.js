function Question(question, options, answer) {
  this.question = question;
  this.options = options;
  this.answer = answer;
}

// DOM elements
const onePlayerButton = document.getElementById('one-player');
const twoPlayerButton = document.getElementById('two-player');
const playerSelection = document.getElementById('player-selection');

const categorySelection = document.getElementById('category-selection');
const categoryButtons = document.querySelectorAll('#category-selection button');

const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question-text');
const optionsList = document.getElementById('options-list');
const optionButtons = document.querySelectorAll('#category-selection button');
const answer = document.getElementById('answer-text');
const showResult = document.getElementById('show-result');
const pointsContainerOnePlayer = document.getElementById('points-container-one-player');
const pointsContainerPlayerOne = document.getElementById('points-container-player-one');
const pointsContainerPlayerTwo = document.getElementById('points-container-player-two');
const returnMenu = document.getElementById('return-menu');
const returnCategory = document.getElementById('return-category');
const resultText = document.getElementById('result-text');
const switchedMessage = document.getElementById('switched-message');
const nextPlayer = document.getElementById('next-player');

// Game state variables
let currentQuestionIndex = 0;
let currentCategoryQuestions;
let points = 0;
let pointsPlayer1 = 0;
let pointsPlayer2 = 0;
const questionsPerRound = 20;
const players = ['Player 1', 'Player 2'];
let currentPlayerIndex = 0;
//let pointsPlayerOne = 0;
//let pointsPlayerTwo = 0;
let numberOfPlayers;
//const playerOne = 'player-one';
//const playerTwo = 'player-two';
let currentPlayer = [];
let selectedCategory;

// Function to show a specific step
function showStep(step) {
  const steps = ['player-selection', 'category-selection', 'question-container', 'show-result', 'player-switched'];
  steps.forEach(s => document.getElementById(s).style.display = 'none');
  document.getElementById(step).style.display = 'block';
}

function showPoints(point) {
  const allPoints = ['points-container-one-player', 'points-container-player-one', 'points-container-player-two'];
  allPoints.forEach(s => document.getElementById(s).style.display = 'none');
  document.getElementById(point).style.display = 'block';
}

// Initial display
showStep('player-selection');


// Event listeners
onePlayerButton.addEventListener('click', () =>{
  showStep('category-selection');
  showPoints('points-container-one-player');
  numberOfPlayers = 'one-player';
  pointsContainerOnePlayer.classList.add('points');
});

twoPlayerButton.addEventListener('click', () =>{
  showStep('category-selection');
  showPoints('points-container-player-one');
  showPoints('points-container-player-two');
  numberOfPlayers = 'two-player';
  pointsContainerPlayerOne.classList.add('points-container-player-one');
  pointsContainerPlayerTwo.classList.add('points-container-player-two');
});

categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    showStep('question-container');
    startGameWithCategory(button.id);
    currentQuestionIndex = 0;
  });
});

returnMenu.addEventListener('click', () =>{
  playerSelection.style.display = 'block';
  categorySelection.style.display = 'none';
  questionContainer.style.display = 'none';
  showResult.style.display = 'none';
  //timerEl.style.display = 'none';
  pointsConpt.style.display = 'none';
  points = 0;
  document.getElementById('points').textContent = `Points : ${points}`;
  //time = 60;
  currentQuestionIndex = 0;
});

returnCategory.addEventListener('click', () => {
  playerSelection.style.display = 'none';
  categorySelection.style.display = 'block';
  questionContainer.style.display = 'none';
  showResult.style.display = 'none';
  //timerEl.style.display = 'none';
  pointsConpt.style.display = 'none';
  points = 0;
  document.getElementById('points').textContent = `Points : ${points}`;
  //time = 60;
  currentQuestionIndex = 0;
});

nextPlayer.addEventListener('click', () => {
  playerSelection.style.display = 'none';
  categorySelection.style.display = 'block';
  questionContainer.style.display = 'none';
  showResult.style.display = 'none';
  //timerEl.style.display = 'none';
  pointsPlayer2 = 0;
  document.getElementById('points-player-two').textContent = `Points joueur 2: ${points}`;
  //time = 60;
  currentQuestionIndex = 0;
});



// Game functions
function startGameWithCategory(category) {
    //startTimer();
    console.log('Entering startGameWithCategory');
  console.log('Category:', category);

  switch (category) {
    case 'category-1':        // Films et Séries
    currentCategoryQuestions = [
      new Question('Dans quel pays se déroule l’action du film Disney "Encanto : La Fantastique Famille Madrigal" ?', ['Espagne', 'Cuba', 'Colombie', 'Brésil'], 'Colombie'),
      new Question('Quel animal est Willy dans le film “Sauvez Willy” ?', ['Un dauphin', 'Une baleine', 'Une orque', 'Un requin'], 'Une orque'),
      new Question('Dans quel film américain d’anticipation, des humains mutants sont capables de prédire les crimes qui vont avoir lieu ?', ['District 9', 'V pour Vendetta', 'A.I intelligence Artificielle', 'Minority Report'], 'Minority Report'),
      new Question('Quelle sitcom américaine des années 90 avait un générique qui se déroule dans un parc d’attraction ?', ['La vie à cinq', 'Notre belle famille', 'Malcom', 'Ma famille d\'abord'], 'Notre belle famille'),
      new Question('Quelle série lancée en 2013 est connue pour être la première série Netflix ?', ['Orange is the new black', 'House of cards', 'Stranger Things', 'The crown'], 'House of cards'),
      new Question('En quelle année le dessin animé Le Roi Lion est-il sorti au cinéma ?', ['1990', '1992', '1994', '1996'], '1994'),
      new Question('Quel est le nom du petit monstre gentil, héros du film Les Gremlins ?', ['Gizmo', 'Willow', 'Tobby', 'Mogwaï'], 'Gizmo'),
      new Question('Combien d’acteurs principaux compte la série télé Friends ?', ['4', '5', '6', '7'], '6'),
      new Question('Quel acteur forme un duo comique avec Louis de Funès dans le film "L’aile ou la cuisse" ?', ['Bourvil', 'Michel Galabru', 'Coluche', 'Claude Gensac'], 'Coluche'),
      new Question('Lequel de ces dessins animés Disney est le plus ancien ?', ['Bambi', 'La belle et le clochard', 'Merlin l\'enchanteur', 'Le livre de la jungle'], 'Bambi'),
      new Question('Dans le film Léon, quel est le prénom de la jeune fille interprétée par Natalie Portman ?', ['Mathilda', 'Isabella', 'Gwendoline', 'Dorothée'], 'Mathilda'),
      new Question('Dans quelle série Omar Sy est le personnage principal ?', ['Marseille', 'Lupin', 'Casa de Papel', 'Jurassic World: La Colo du Cétacé'], 'Lupin'),
      new Question('Quel célèbre artiste est représenté sur les masques de la série Casa de Papel ?', ['Salvator Dali', 'Pablo Picasso', 'Paco Rabanne', 'Francisco de Goya'], 'Salvator Dali'),
      new Question('Quelle est la race du chien dans la saga de films Beethoven ?', ['Saint-Bernard', 'Berger Hollandais', 'Golden Retriever', 'Spitz'], 'Saint-Bernard'),
      new Question('Quelle série met en avant le cartel de la drogue de Medellín ?', ['Sense 8', 'Orange is the new black', 'Narcos', 'Dark'], 'Narcos'),
      new Question('Lequel de ces films n’est pas réalisé par Luc Besson ?', ['Le Grand Bleu', 'Taxi', 'Lucy', 'Arthur et les Minimoys'], 'Taxi'),
      new Question('Quel est le nom du peuple qui habite Pandora dans le film Avatar de James Cameron ?', ['Les Cen\'tauri', 'Les Na\'vis', 'Les Mo\'at', 'Les Qua\'ritch'], 'Les Na\'vis'),
      new Question('Qui prête sa voix à la princesse Sélénia dans la saga Arthur et les Minimoys ?', ['Laetitia Casta', 'Sophie Marceau', 'Zazie', 'Mylène Farmer'], 'Mylène Farmer'),
      new Question('De quel film est cette réplique : "La tour Eiffel… entièrement faite avec des allumettes, 346 422 exactement !" ?', ['Les bronzés font du ski', 'Le dîner de cons', 'Le placard', 'Le petit baigneur'], 'Le dîner de cons'),
      new Question('Sous quel autre nom est connu le personnage de Stitch dans le dessin animé Disney “Lilo & Stitch” ?', ['Monstre 101', 'ADN 433', 'Expérience 626', 'Alien 812'], 'Expérience 626'),
      new Question('De quelle série télé des années 90, le personnage de Steve Urkel appartient-il ?', ['La vie de famille', 'Parker Lewis ne perd jamais', 'Arnold et Willy', 'Ma famille d\'abord'], 'La vie de famille'),
      new Question('Quel est le nom de la série Netflix populaire et tournée en France : _____ in Paris ?', ['Julia', 'Emily', 'Betty', 'Naomi'], 'Emily'),
      new Question('Dans la série Squid Game, quelle est la forme dans le gâteau de Gi-Hun ?', ['Un coeur', 'Un parapluie', 'Un triangle', 'Une étoile'], 'Un parapluie'),
      new Question('Dans combien de films, Johnny Depp incarne-t-il Jack Sparrow dans la saga Pirates des Caraïbes ?', ['3 Films', '4 Films', '5 Films', '6 Films'], '5 Films'),
      new Question('Dans la saga cinématographique "L\'Âge de glace", quel animal est Sid ?', ['Un écureuil', 'Un mammouth', 'Un paresseux', 'Un dinosaure'], 'Un paresseux'),
      new Question('Comment se prénomme la vache dans le film d’Henri Verneuil “La vache et le prisonnier” ?', ['Anémone', 'Germaine', 'Marguerite', 'Ginette'], 'Marguerite'),
      new Question('Dans la série “Une nounou d’enfer”, pour quel producteur de Broadway Fran Fine doit-elle s’occuper des enfants ?', ['Maxwell Sheffield', 'Daniel Davis', 'Mar Jacobson', 'Charles Shaughnessy'], 'Maxwell Sheffield'),
      new Question('Quels sont les prénoms des 3 sœurs Halliwell au début de la série Charmed ?', ['Prue, Phoebe, Paige', 'Phoebe, Paige, Piper', 'Piper, Phoebe, Prue', 'Paige, Prue, Piper'], 'Piper, Phoebe, Prue'),
      new Question('En quelle année le film The Mask est-il sorti au cinéma ?', ['1994', '1996', '1998', '2000'], '1994'),
      new Question('En quelle année se déroule l’histoire du film Le Cinquième Élément ?', ['2020', '2099', '2263', '2542'], '2263'),
      new Question('Qui est le réalisateur des films Les Tuche ?', ['Olivier Baroux', 'Kad Mérad', 'Jean-Paul Rouve', 'Pef'], 'Olivier Baroux'),
      new Question('Quelle série pour enfants, apparue dans les années 60, raconte les aventures de Pimprenelle et Nicolas ?', ['Chapi Chapo', 'Bonne nuit les petits', 'Le Manège enchanté', 'La maison de Toutou'], 'Bonne nuit les petits'),
      new Question('Dans quelle série tv, retrouve-t-on le personnage d\'Horacio Caine, lieutenant de police ?', ['New-York, police judiciare', 'Les Experts: Miami', 'NCIS: Enquêtes spéciales', 'Esprits criminels'], 'Les Experts: Miami'),
      new Question('Quel est le nom de l\’acteur ayant incarné le personnage de Grégory House dans la série Dr House ?', ['Patrick Dempsey', 'Hugh Laurie', 'Frankie Muniz', 'Michael C. Hall'], 'Hugh Laurie'),
      new Question('Quel est le nom de la souris compagnon de Dumbo dans le grand classique Disney ?', ['Jérémie', 'Timothée', 'Lucien', 'Gus'], 'Timothée'),
      new Question('Quelle actrice incarne Mercredi Addams dans la série Netflix Mercredi ?', ['Emma Myers', 'Jenna Ortega', 'Millie Bobby Brown', 'Maya Hawke'], 'Jenna Ortega'),
      new Question('Suite à quel film la chanson “Quand te reverrai-je…” est-elle devenue célèbre à la montagne ?', ['La Reine des neiges', 'Tout là-haut', 'Malabar Princess', 'Les Bronzés font du ski'], 'Les Bronzés font du ski'),
      new Question('Quel personnage d\’un dessin animé Disney, est dans l\’histoire originale un assassin qui tue par plaisir ?', ['Aladdin', 'Mowgli', 'Peter Pan', 'Tarzan'], 'Peter Pan'),
    ];
    break;
    case 'category-2':     // Culture Générale
    currentCategoryQuestions = [
      new Question('Quel est le véritable nom du dramaturge français qu\'on appelle Molière ?', ['Jean-Baptiste Lully', 'Jean-Baptiste Poquelin', 'Jean-Baptiste Maunier', 'Jean-Baptiste Colbert'], 'Jean-Baptiste Poquelin'),
      new Question('Comment s’appelle le chien de Mickey ?', ['Daffy', 'Dingo', 'Pluto', 'Donald'], 'Pluto'),
      new Question('Quelle est la langue maternelle la plus parlée au monde ?', ['Le mandarin', 'L\'anglais', 'Le français', 'Le russe'], 'Le mandarin'),
      new Question('Quelle couleur obtient-on quand on mélange du bleu et du rouge ?', ['Rose', 'Vert', 'Marron', 'Violet'], 'Violet'),
      new Question('Quelle ville française est connue avec le surnom de capitale de Noël ?', ['Grenoble', 'Strasbourg', 'Limoges', 'Toulouse'], 'Strasbourg'),
      new Question('Quelle est la signification de l’acronyme BAC dans la Police nationale française ?', ['Brigade anti-corruption', 'Brigade anti-commando', 'Brigade anti-casseurs', 'Brigade anti-criminalité'], 'Brigade anti-criminalité'),
      new Question('Quelle pseudo-céréale est également appelée "blé noir" ?', ['Le sarrasin', 'Le seigle', 'L\'avoine', 'L\'orge'], 'Le sarrasin'),
      new Question('Dans quelle phase du sommeil se produisent les rêves dont on se souvient ?', ['Le sommeil Léger', 'Le sommeil paradoxal', 'Le sommeil profond', 'le coma'], 'Le sommeil paradoxal'),
      new Question('Quelle est la capitale du Kenya ?', ['Mombasa', 'Mogadiscio', 'Nairobi', 'Djibouti'], 'Nairobi'),
      new Question('Dans quelle ville êtes-vous si vous atterrissez à l’aéroport de LaGuardia ?', ['New York', 'Rio de Janeïro', 'Mexico', 'Madrid'], 'New York'),
      new Question('Quelle est la troisième langue officielle de la Belgique avec le français et le néerlandais ?', ['Le flamand', 'L\'allemand', 'Le luxembourgeois', 'L\'anglais'], 'L\'allemand'),
      new Question('Combien de fleurs de lys sont présentes sur le Drapeau du Québec ?', ['1', '2', '4', '6'], '4'),
      new Question('Qu’est-ce qu’une eau saumâtre ?', ['Une eau polluée', 'Une eau de couleur orangée', 'Une eau boueuse', 'Une eau salée'], 'Une eau salée'),
      new Question('Quelle est la durée minimale nécessaire pour effectuer un voyage de la Terre vers la planète Mars ?', ['6 semaines', '4 mois', '8 mois', '14 mois'], '8 mois'),
      new Question('Quel est l’animal national de l’Écosse ?', ['Le monstre du Loch Ness', 'Le tigre', 'La licorne', 'Le papillon'], 'La licorne'),
      new Question('Dans quel pays roule-t-on à gauche en voiture ?', ['Le Gabon', 'L\'Indonésie', 'L\'Ukraine', 'Le Brésil'], 'L\'Indonésie'),
      new Question('Sous quel pseudo est plus connu le rappeur américain Calvin Broadus ?', ['R. Kelly', '50 cent', 'Snoop Dogg', 'Eminem'], 'Snoop Dogg'),
      new Question('Selon la Bible, qui a reçu de Dieu, les Tables de la Loi avec les 10 Commandements ?', ['Noé', 'Moïse', 'Gabriel', 'Juda'], 'Moïse'),
      new Question('Quel est le nom de l’ancêtre du vélo et qui lui a donné son nom ?', ['Le Vélocipède', 'Le Vélothon', 'Le Vélocyclette', 'Le Vélo à propulsion'], 'Le Vélocipède'),
      new Question('Dans quelle émission de télé le chanteur Julien Doré a-t-il commencé sa carrière ?', ['Star Academy', 'The Voice', 'Nouvelle Star', 'Popstars'], 'Nouvelle Star'),
      new Question('De quel arbre fruitier est issue la mangue ?', ['Le mangoustier', 'Le magatier', 'Le manguier', 'Le manitier'], 'Le manguier'),
      new Question('Que signifie le verbe procrastiner ?', ['Se répéter', 'Remettre à plus tard', 'Tourner en rond', 'Se mettre en colère'], 'Remettre à plus tard'),
      new Question('En mathématiques, que symbolise un huit couché ?', ['Abscisse', 'Ordonnée', 'Infini', 'Différent'], 'Infini'),
      new Question('Dans quelle direction le Soleil se lève-t-il ?', ['Nord', 'Sud', 'Est', 'Ouest'], 'Est'),
      new Question('Lequel de ces fruits rouges pousse dans un arbre ?', ['La fraise', 'La groseille', 'La cerise', 'La framboise'], 'La cerise'),
      new Question('Combien de dents possède un adulte normalement constitué ?', ['28 dents', '30 dents', '32 dents', '34 dents'], '32 dents'),
      new Question('Comment s’appelle l’organe respiratoire du poisson ?', ['Les branchies', 'Les poumons', 'Les nageoires', 'Les arêtes'], 'Les branchies'),
      new Question('Qu’est-ce que la proue sur un bateau ?', ['Le mât', 'L\'avant du bateau', 'L\'arrière du bateau', 'La cale'], 'L\'avant du bateau'),
      new Question('Quelle est la seconde ville la plus peuplée des États-Unis après New York ?', ['Washington D.C', 'Los Angeles', 'San Francisco', 'Atlanta'], 'Los Angeles'),
      new Question('Combien de côtés possède un dodécagone ?', ['10', '12', '14', '16'], '12'),
      new Question('Quelle est la dernière lettre de l’alphabet grec ?', ['Sigma', 'Lambda', 'Omega', 'Delta'], 'Omega'),
      new Question('Quelle reine d\'Égypte était la première épouse du pharaon Ramsès II ?', ['Néfertari', 'Cléopatre', 'Hatchepsout', 'Tiyi'], 'Néfertari'),
      new Question('De quel pays le gâteau brioché appelé “panettone” est-il originaire ?', ['Allemagne', 'Suisse', 'Italie', 'Espagne'], 'Italie'),
      new Question('En moyenne, combien d\’années un homme passe-t-il aux toilettes au cours de sa vie ?', ['1 an', '3 ans', '6 ans', '8 ans'], '3 ans'),
      new Question('De quel pays le fromage nommé la mimolette est-il originaire ?', ['Pays-Bas', 'Allemagne', 'France', 'Grèce'], 'France'),
    ];
    break;
    case 'category-3':     // Sports
    currentCategoryQuestions = [
      new Question('Quelle est la durée d\'une mi-temps dans un match de rugby à XV ?', ['30 minutes', '35 minutes', '40 minutes', '45 minutes'], '40 minutes'),
      new Question('Dans quel sport, trouve-t-on le ballon le plus gros au niveau professionnel ?', ['Basketball', 'Water-polo', 'Handball', 'Football'], 'Basketball'),
      new Question('Dans quel club britannique évoluent les footballeurs surnommés les "Reds" ?', ['Arsenal', 'Chelsea', 'Tottenham', 'Liverpool'], 'Liverpool'),
      new Question('Dans quelle ville européenne, les Jeux olympiques d\'été ont-ils été organisés en 1972 ?', ['Paris', 'Munich', 'Barcelone', 'Athènes'], 'Munich'),
      new Question('Dans quel sport collectif tire-t-on des lancers francs ?', ['Handball', 'Volleyball', 'Badminton', 'Basketball'], 'Basketball'),
      new Question('Quel pilote français de Formule 1 est décédé des suites d\’un accident survenu au Grand Prix du Japon 2014 ?', ['Sébastien Bourdais', 'Pierre Gasly', 'Romain Grosjean', 'Jules Bianchi'], 'Jules Bianchi'),
      new Question('De quelle île de la Méditerranée Rafael Nadal est-il originaire ?', ['Crête', 'Ibiza', 'Majorque', 'Formentera'], 'Majorque'),
      new Question('Dans quelle discipline sportive Muriel Hermine s\'est-elle illustrée ?', ['Patinage artistique', 'Natation synchronisée', 'Ski alpin', 'Judo'], 'Natation synchronisée'),
      new Question('Au bowling traditionnel, combien de quilles faut-il renverser pour faire un strike ?', ['8', '9', '10', '11'], '10'),
      new Question('Quelle discipline était présente aux Jeux Olympiques jusqu’en 1948 ?', ['La peinture', 'La danse', 'Le calcul mental', 'Les échecs'], 'La peinture'),
      new Question('Laquelle des couleurs suivantes n\'est pas une couleur de piste de ski alpin ?', ['Noire', 'Verte', 'Jaune', 'Rouge'], 'Jaune'),
      new Question('Où ont eu lieu les premiers JO d’hiver en 1924 ?', ['Saint-Moritz (Suisse)', 'Chamonix (France)', 'Lake Placid (Etats-Unis)', 'Garmish-Partenkirchen (Allemagne)'], 'Chamonix (France)'),
    ];
    break;
    case 'category-4':    // Géographie
    currentCategoryQuestions = [
      new Question('Dans quel pays se situe la baie d\'Along ?', ['Vietnam', 'Japon', 'Birmanie', 'Inde'], 'Inde'),
      new Question('À quel continent le Cap-Vert est-il rattaché ?', ['L\'Europe', 'L\'Asie', 'L\'Océanie', 'L\'Afrique'], 'L\'Afrique'),
      new Question('Quelles sont les couleurs du drapeau de la Thaïlande ?', ['Rouge, blanc et jaune', 'Rouge et blanc', 'Rouge et bleu', 'Rouge, bleu et blanc'], 'Rouge, bleu et blanc'),
      new Question('Quel pays est souvent surnommé “Le toit du monde” ?', ['Le Japon', 'Le Pérou', 'Le Népal', 'La Russie'], 'Le Népal'),
      new Question('Quel pays ne fait pas partie du Maghreb ?', ['Tunisie', 'Algérie', 'Maroc', 'Turquie'], 'Turquie'),
      new Question('Quel pays possède plus de lacs, que tout le reste du monde réuni ?', ['Brésil', 'Russie', 'Canada', 'France'], 'Canada'),
      new Question('Pour quelle raison l\'île indienne de North Sentinel est-elle strictement interdite d’accès ?', ['L\'île possède des plantes extrêmement toxiques', 'L\'île est peuplée par une tribu de guerriers', 'L\'île possède un caractère sacré en Inde', 'L\'île est un lieu de reproduction privilégié des tortues marines'], 'L\'île est peuplée par une tribu de guerriers'),
      new Question('Qu’est-ce qui n’est pas illégal en Allemagne ?', ['Tuer ses parents', 'Voler pour manger', 'S\'évader de prison', 'Faire l\'amour en public'], 'S\'évader de prison'),
      new Question('Quel pays possède un arbre sur son drapeau ?', ['Canada', 'Pérou', 'Liban', 'Sri Lanka'], 'Liban'),
    ];
    break;

    case 'category-5':     // Musique
    currentCategoryQuestions = [
      new Question('De quel groupe, la chanteuse Beyoncé a-t-elle fait partie jusqu’au début des années 2000 ?', ['Spice Girls', 'Destiny\'s Child', 'TLC', 'All Saints'], 'Destiny\'s Child'),
      new Question('Quelle chanson en langue étrangère fait danser la France à partir de 1989 ?', ['La Lambada', 'La Macarena', 'Esereje', 'Tarzan Boy'], 'La Lambada'),
      new Question('Avec quel rappeur, Luis Fonsi est-il accompagné pour sa chanson “Despacito” sortie à l’été 2017 ?', ['Daddy Cherokee', 'Daddy Yankee', 'Daddy Apache', 'Daddy Cow-boy'], 'Daddy Yankee'),
      new Question('Quel groupe explose à l’été 2009 avec la chanson “Laisse-toi aller bébé” ?', ['Fatal Bazooka', 'Magic System', 'Sexion d\'Assaut', 'Collectif Métissé'], 'Collectif Métissé'),
      new Question('Quel est l’instrument de musique préféré d’Assurancetourix dans Astérix ?', ['Une harpe', 'Une citare', 'Une lyre', 'Une corne de brume'], 'Une lyre'),
      new Question('Combien de touches comporte généralement un piano à queue ?', ['88 touches', '94 touches', '98 touches', '104 touches'], '88 touches'),
      new Question('De quel instrument Mstislav Rostropovitch a-t-il joué au pied du mur de Berlin le 11 novembre 1989 ?', ['Contrebasse', 'Violoncelle', 'Piano', 'Guitare'], 'Violoncelle'),
      new Question('En quelle matière sont faites les flûtes de pan traditionnelles d’Amérique du Sud ?', ['Bambou', 'Canne à sucre', 'Roseau', 'Acajou'], 'Roseau'),
      new Question('Quelle est la dernière artiste à avoir remporté l’Eurovision pour la France ?', ['Marie Myriam', 'Frida Boccara', 'Amina', 'Anggun'], 'Marie Myriam'),
      new Question('Quelle chanson ayant remporté le concours de l’Eurovision a été écrite par Serge Gainsbourg ?', ['Nous les amoureux', 'L\'oiseau et l\'enfant', 'Poupée de cire, poupée de son', 'Ne partez pas sans moi'], 'Poupée de cire, poupée de son'),
      new Question('De quel pays est originaire le groupe ABBA ?', ['Allemagne', 'Pays-bas', 'Suède', 'Finlande'], 'Suède'),
      new Question('Qui est l’interprète de la chanson “Savoir aimer” ?', ['Daniel Balavoine', 'Florent Pagny', 'Michel Sardou', 'Joe Dassin'], 'Florent Pagny'),
      new Question('Avec quelle chanteuse française Andrea Bocelli interprète “Vivo per lei” en 1997 ?', ['Mireille Mathieu', 'Hélène Ségara', 'Julie Piétri', 'Sylvie Vartan'], 'Hélène Ségara'),
      new Question('Qui a composé et écrit “Pour que tu m’aimes encore”, chantée par Céline Dion en 1995 ?', ['Jean-Jacques Goldman', 'Pascal Obispo', 'Johnny Hallyday', 'Julien Clerc'], 'Jean-Jacques Goldman'),
      new Question('De quelle comédie musicale est extraite la chanson “Belle”, interprétée par Garou, Daniel Lavoie et Patrick Fiori ?', ['Les dix Commandements', 'Roméo et Juliette', 'Le Roi Soleil', 'Notre Dame de Paris'], 'Notre Dame de Paris'),
      new Question('De quelle chanson de Johnny Hallyday sont extraites ces paroles : “j’y crois comme à ta peau, à tes bras qui me serrent…” ?', ['Laura', 'Je te promets', 'Gabrielle', 'Sang pour sang'], 'Je te promets'),
      new Question('Quel groupe interprète la chanson d’amour “Still loving you” en 1984 ?', ['Les Eagles', 'Nirvana', 'Les Rolling Stones', 'Scorpions'], 'Scorpions'),
      new Question('Quelle chanteuse a repris la chanson de Francis Cabrel “Je l’aime à mourir” en 2011 ?', ['Tina Arena', 'Céline Dion', 'Shakira', 'Madonna'], 'Shakira'),
      new Question('De quel film, la chanson d\'amour "Love Me Like You Do" d\'Ellie Goulding est-elle la bande originale ?', ['Le Journal de Bridget Jones', '50 Nuances de Grey', 'Love Actually', 'Coup de foudre à Notting Hill'], '50 Nuances de Grey'),
      new Question('Quelle chanson culte de Queen est illustrée par un clip où les membres du groupe sont grimés en femme au foyer ?', ['Another one bites the dust', 'Friends will be friends', 'it\'s a kind of magic', 'I want to break free'], 'I want to break free'),
      new Question('Qui est l’auteur de la “Chanson des restos” en 1986 ?', ['Coluche', 'Jean-Jacques Goldman', 'Renaud', 'Michel Berger'], 'Jean-Jacques Goldman'),
      new Question('Quel est le premier succès musical de la chanteuse Céline Dion en 1981 ?', ['D\'amour ou d\'amitié', 'Ce n\'était qu\'un rêve', 'Ne partez pas sans moi', 'L\'amour viendra'], 'Ce n\'était qu\'un rêve'),
      new Question('Quelle chanson est considérée comme le premier tube de rap français en 1981 ?', ['Je danse le Mia', 'Chacun fait ce qu\'il lui plaît', 'Bouge de là', 'Paris Latino'], 'Chacun fait ce qu\'il lui plaît'),
      new Question('Quel type de bonbon n’est pas cité dans la chanson Mistral Gagnant de Renaud ?', ['Car-en-sac', 'Roudoudou', 'Carambar', 'Pimousse'], 'Pimousse'),
    ];
    break;

    case 'category-6':    // Nature et Environnement
    currentCategoryQuestions = [
      new Question('Combien de temps faut-il généralement à un paresseux pour parcourir 1 km ?', ['4 jours', '1 semaine', '2 semaines', 'Plus d\'un mois'], 'Plus d\'un mois'),
      new Question('Quels animaux ont une forte libido et des comportements violents avec les femelles qui peuvent s\'apparenter à des viols ?', ['Les pandas', 'Les Kangourous', 'Les dauphins', 'Les écureuils'], 'Les dauphins'),
      new Question('Quel est l\’animal terrestre le plus rapide du monde ?', ['L\'autruche', 'L\'antilope', 'Le kangourou', 'Le guépard'], 'Le guépard'),
      new Question('De quel arbre proviennent les feuilles dont les koalas sont très friands ?', ['Araucacia', 'Niaouli', 'Bambou', 'Eucalyptus'], 'Eucalyptus'),
      new Question('Lequel de ces oiseaux ne vole pas ?', ['Le toucan', 'Le kiwi', 'Le macareux', 'Le colibri'], 'Le kiwi'),
      new Question('Lequel de ces légumes ne fait pas partie de la famille des légumes-tiges ?', ['Le poireau', 'La rhubarbe', 'L\'asperge', 'Le concombre'], 'Le concombre'),
      new Question('Que fait la mante religieuse après l\'accouplement ?', ['Elle meurt', 'Elle dévore le mâle', 'Elle mue', 'Elle devient reine'], 'Elle dévore le mâle'),
      new Question('À quelle famille animale présente exclusivement en Afrique, le lycaon appartient-il ?', ['Canidés', 'Camélidés', 'Félidés', 'Equidés'], 'Canidés'),
      new Question('Quel serpent d’Afrique est considéré comme le serpent le plus dangereux au monde ?', ['Python de Seba', 'Vipère heurtante', 'Mamba noir', 'Cobra du Mozambique'], 'Mamba noir'),
      new Question('Quel est l’animal le plus dangereux d’Afrique, qui fait le plus de morts chaque année ?', ['Crocodile du Nil', 'Lion', 'Hippopotame', 'Eléphant'], 'Hippopotame'),
      new Question('Sous quel arbre n’est-il pas recommandé de garer une voiture en période de floraison ?', ['Le sapin', 'Le cerisier', 'Le tilleul', 'Le marronnier'], 'Le tilleul'),
      new Question('Combien de cornes possèdent les rhinocéros d’Afrique ?', ['Aucune', '1', '2', '3'], '2'),
      new Question('Quel légume est appelé chicon dans le Nord de la France ?', ['L\'endive', 'Le salsifi', 'Le radis', 'Le poireau'], 'L\'endive'),
      new Question('Comment appelle-t-on les anneaux concentriques sur les troncs des arbres coupés ?', ['Spirales', 'Ellipses', 'Cernes', 'Boucles'], 'Cernes'),
      new Question('Quelle est la hauteur du plus grand arbre du monde, le sequoia californien nommé l’Hyperion ?', ['76 mètres', '104 mètres', '116 mètres', '131 mètres'], '116 mètres'),
      new Question('Que fait la mante religieuse après l\'accouplement ?', ['Elle meurt', 'Elle dévore le mâle', 'Elle mue', 'Elle devient reine'], 'Elle dévore le mâle'),
    ];
    break;
  }

    shuffleArray(currentCategoryQuestions);
    selectionOfTwentyQuestions(questionsPerRound);
    displayCurrentQuestion();
}

function displayCurrentQuestion() {
  console.log('Entering displayCurrentQuestion');
  if (currentQuestionIndex < currentCategoryQuestions.length) {
    const currentQuestion = currentCategoryQuestions[currentQuestionIndex];

    questionText.textContent = currentQuestion.question;

    optionsList.innerHTML = '';

    currentQuestion.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.textContent = option;
      button.addEventListener('click', () => {
        checkAnswer(index);
      });
      optionsList.appendChild(button);
    });
  }
}

function checkAnswer(selectedIndex) {
  console.log('Entering checkAnswer');
  const currentQuestion = currentCategoryQuestions[currentQuestionIndex];

  if (currentQuestion.answer === currentQuestion.options[selectedIndex]) {
    console.log('Correct answer!');
    answer.textContent = `Bravo ! ${currentQuestion.options[selectedIndex]} est la bonne réponse !`;
    questionContainer.classList.add('correct');

    // Update points based on the number of players
    if (numberOfPlayers === 'one-player') {
      points++;
      document.getElementById('points-container-one-player').textContent = `Points : ${points}`;
    } else if (numberOfPlayers === 'two-player') {
      if (currentPlayerIndex === 0) {
        pointsPlayer1++;
        document.getElementById('points-player-one').textContent = `Points joueur 1 : ${pointsPlayer1}`;
      } else if (currentPlayerIndex === 1) {
        pointsPlayer2++;
        document.getElementById('points-player-two').textContent = `Points joueur 2 : ${pointsPlayer2}`;
      }
    }
  } else {
    console.log('Incorrect answer.');
    answer.textContent = `Désolé, la bonne réponse était ${currentQuestion.answer}`;
    questionContainer.classList.add('incorrect');
  }

  // Remove the class after one second
  setTimeout(() => {
    questionContainer.classList.remove('correct', 'incorrect');
    currentQuestionIndex++;

    if (currentQuestionIndex < currentCategoryQuestions.length) {
      displayCurrentQuestion();
    } else {
      endOfRound();
    }
  }, 1000);
}


function endOfRound() {
  if (numberOfPlayers === 'one-player') {
    showStep('show-result');
    resultText.textContent = `Félicitation vous avez terminé ! Vous avez obtenu un résultat de ${points}/${currentQuestionIndex}`;
  } else if (numberOfPlayers === 'two-player') {
    // Switch player
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;

    showStep('player-switched');
    switchedMessage.textContent = `C\'est maintenant le tour de ${players[currentPlayerIndex]}.`;
  }
}

function shuffleArray(array) {
  if (array && array.length) {
    for (let i = array.length -1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
   }
  }
}

function selectionOfTwentyQuestions(questionsPerRound) {
  console.log('entering selectionOfTwentyQuestions');
  const selectedQuestions = [];

if (currentCategoryQuestions && currentCategoryQuestions.length) {
  for (let i = 0; i < questionsPerRound && i < currentCategoryQuestions.length; i++) {
    selectedQuestions.push(currentCategoryQuestions[i]);
  }
}

  currentCategoryQuestions = selectedQuestions;
}


  /*setTimeout(() => {
    questionContainer.classList.remove('correct');
    questionContainer.classList.remove('incorrect');
    answer.textContent = '';
    currentQuestionIndex++;
    
    
      displayCurrentQuestion();
  }, 650);*/




//let time = 60;
//let intervalId;
//const timerEl = document.getElementById('timer');


/*function startTimer() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  seconds = seconds < 10 ? '0' + seconds : seconds;

  timerEl.innerHTML = `${minutes}: ${seconds}`
  time--;
}
*/

/*if (intervalId) {
    clearInterval(intervalId);
  }
  intervalId = setInterval(() => {
    startTimer();
  if (time <= 0 || currentQuestionIndex >= currentCategoryQuestions.length) {
    clearInterval(intervalId);
    if (currentQuestionIndex >= currentCategoryQuestions.length) {
      questionText.textContent = `Félicitation, vous avez terminé ! Vous avez obtenu ${points} points sur ${currentQuestionIndex}`;
      optionsList.innerHTML = '';
    }
  }
}, 1000);*/


/*
optionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.textContent;
    startGameWithCategory(category);
  });
});
*/
/*
function startGame(numberOfPlayers) {
  if (numberOfPlayers === '1 joueur') {
    document.getElementById('player-selection').style.display = 'none';
    console.log('Vous avez choisi le mode 1 joueur !');
    startGameWithCategory('');
  }
}*/

/*const nextPlayerButton = document.createElement('button');
function showNextPlayerButton() {
  if (numberOfPlayers === 'two-player') {
  nextPlayerButton.textContent = 'Passer au joueur suivant';
  nextPlayerButton.addEventListener('click', () => {
    // Changer de joueur
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;

    // Réinitialiser l'index des questions
    currentCategoryQuestions = 0;

    // Afficher l'étape de séléction des catégories
    showStep('category-selection');
    startGameWithCategory();
  });
 }
  // Ajouter le bouton à l'élément
  questionContainer.appendChild(nextPlayerButton);
}*/