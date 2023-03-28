const diceEL = document.querySelector('#dice');
const score1EL = document.querySelector('#score--1');
const score2EL = document.querySelector('#score--2');
const btnRoll = document.querySelector('#btn--roll');
const btnNew = document.querySelector('#btn--new');
const btnHold = document.querySelector('#btn--hold');
const currentScoreEL1 = document.querySelector('#current--score--1');
const currentScoreEL2 = document.querySelector('#current--score--2');
const player1EL = document.querySelector('#player--1');
const player2EL = document.querySelector('#player--2');

//Initialisation
diceEL.src = '';
score1EL.textContent = 0;
score2EL.textContent = 0;
let currentScore = 0;
let currentPlayer = 1;
let scorePlayer1 = 0;
let scorePlayer2 = 0;
let play = true;

btnRoll.addEventListener('click', function () {
  if (play === false) return;
  //1.generate random dice
  const dice = Math.trunc(Math.random() * 6 + 1);

  //2.display dice image
  diceEL.src = `./images/dice${dice}.png`; //ES6

  //3.switch player
  if (dice === 1) {
    switchPlayer();
    return;
  }

  //4.dispaly current score
  currentScore += dice;
  if (currentPlayer === 1) {
    currentScoreEL1.textContent = currentScore;
  } else {
    currentScoreEL2.textContent = currentScore;
  }
});

btnHold.addEventListener('click', () => {
  if (play === false) return;
  //1.calculate new score
  if (currentPlayer === 1) {
    scorePlayer1 += currentScore;
    score1EL.textContent = scorePlayer1;
    winner(scorePlayer1);
  } else {
    scorePlayer2 += currentScore;
    score2EL.textContent = scorePlayer2;
    winner(scorePlayer2);
  }
});

btnNew.addEventListener('click', () => {
  diceEL.src = '';
  score1EL.textContent = 0;
  score2EL.textContent = 0;
  currentScore = 0;
  currentPlayer = 1;
  scorePlayer1 = 0;
  scorePlayer2 = 0;
  play = true;
  player1EL.classList.remove('winner');
  player2EL.classList.remove('winner');
  player1EL.classList.add('active');
  player2EL.classList.remove('active');
});

const winner = (score) => {
  if (score >= 20) {
    let winnerName = '';
    if (currentPlayer === 1) {
      player1EL.classList.add('winner');
      winnerName = prompt('Joueur 1 a gagné! Entrez votre nom:');
    } else {
      player2EL.classList.add('winner');
      winnerName = prompt('Joueur 2 a gagné! Entrez votre nom:');
    }
    currentScoreEL1.textContent = 0;
    currentScoreEL2.textContent = 0;
    diceEL.src = '';
    play = false;

    // Mettre à jour les scores affichés
    showHighScores();
  } else {
    //switch player
    switchPlayer();
  }
};

const switchPlayer = () => {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  currentScore = 0;
  currentScoreEL1.textContent = 0;
  currentScoreEL2.textContent = 0;
  player1EL.classList.toggle('active');
  player2EL.classList.toggle('active');
};

const showHighScores = () => {
  // Récupérer les scores stockés localement
  let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

  // Trier les scores par ordre décroissant
  highScores.sort((a, b) => b.score - a.score);

  // Afficher les 5 meilleurs scores
  const highScoresList = document.querySelector('#high-scores');
  highScoresList.innerHTML = '';
  for (let i = 0; i < 5 && i < highScores.length; i++) {
    const li = document.createElement('li');
    li.textContent = `${highScores[i].name}: ${highScores[i].score}`;
    highScoresList.appendChild(li);
  }
};

// Mise à jour des scores au rechargement
window.addEventListener('load', showHighScores);

// Faire apparaître et disparaître les meilleurs scores
const btnHighScores = document.querySelector('#btn--high-scores');
btnHighScores.addEventListener('click', () => {
  const bestScoreEL = document.querySelector('.high-content');
  if (bestScoreEL.classList.contains('hidden')) {
    bestScoreEL.classList.remove('hidden');
  } else {
    bestScoreEL.classList.add('hidden');
  }
});
