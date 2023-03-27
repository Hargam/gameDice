const diceEL = document.querySelector("#dice");
const score1EL = document.querySelector("#score--1");
const score2EL = document.querySelector("#score--2");
const btnNewGame = document.querySelector("#btn--new");
const btnRoll = document.querySelector("#btn--roll");
const btnGold = document.querySelector("#btn--hold");
const currentScoreEL1 = document.querySelector("#current--score--1");
const currentScoreEL2 = document.querySelector("#current--score--2");
const player1EL = document.querySelector("#player--1");
const player2EL = document.querySelector("#player--2");

// Initialisation
diceEL.src = '';
score1EL.textContent = 0;
score2EL.textContent = 0;
let currentScore = 0;
let currentPlayer = 1;

btnRoll.addEventListener('click', function () {
    //générer un nombre aléatoire sur le dé
    const dice = Math.trunc(Math.random) * 6 + 1;

    //afficher l'image correspondante
    diceEL.src = `./img/dice${dice}.png`; //ES6

    // changer de joueur et réinitialiser les scores
    if (dice === 1) {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        currentScore = 0;
        currentScoreEL1.textContent = 0;
        currentScoreEL2.textContent = 0;
        player1EL.classList.toogle('active');
        player2EL.classList.toogle('active');
        return;
    }

    //voir le score
    currentScore += dice;
    if (currentPlayer === 1) {
        currentScoreEL1.textContent = currentScore;
    } else {
        currentScoreEL2.textContent = currentScore;
    }
})