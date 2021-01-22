'use strict';

const btnRoll = document.querySelector('.btn--roll');
const dice = document.querySelector('.dice');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
let activePlayer = 0;
let currentScore = 0;
let player0Score = 0;
let player1Score = 0;
let won = false;

const generateRandomNumber = function () {
  const randomNumber = Math.trunc(Math.random() * 6) + 1;
  return randomNumber;
};

const setDiceImage = function (randomNumber) {
  dice.setAttribute('src', `dice-${randomNumber}.png`);
};

const changePlayer = function () {
  const player0 = document.querySelector('.player--0');
  const player1 = document.querySelector('.player--1');

  if (player0.classList.contains('player--active')) {
    //current active player is player--0
    document.querySelector('#current--0').textContent = currentScore;
    activePlayer = 1;
    player0.classList.remove('player--active');
    player1.classList.add('player--active');
  } else {
    //current active player is player--1
    document.querySelector('#current--1').textContent = currentScore;
    activePlayer = 0;
    player1.classList.remove('player--active');
    player0.classList.add('player--active');
  }
};

const btnRollClick = function () {
  if (!won) {
    const randomNumber = generateRandomNumber();
    setDiceImage(randomNumber);
    if (randomNumber !== 1) {
      currentScore += randomNumber;

      let playerScore = 0;
      if (activePlayer === 0) {
        playerScore = player0Score;
      } else {
        playerScore = player1Score;
      }
      if (playerScore + currentScore >= 100) {
        won = true;
        document.querySelector(`#current--${activePlayer}`).textContent = 0;
        document.querySelector(`#score--${activePlayer}`).textContent =
          playerScore + currentScore;
        document.querySelector('.player--active').classList.add('player--won');
      }

      document.querySelector(
        `#current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      currentScore = 0;
      changePlayer();
    }
  }
};

const btnHoldClick = function () {
  if (!won) {
    if (activePlayer === 0) {
      player0Score += currentScore;
      document.querySelector('#score--0').textContent = player0Score;
    } else {
      player1Score += currentScore;
      document.querySelector('#score--1').textContent = player1Score;
    }
    currentScore = 0;
    changePlayer();
  }
};

const btnNewClick = function () {
  won = false;
  document.querySelector('.player--active').classList.remove('player--won');
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.add('player--active');
  const allScores = document.querySelectorAll('.score');
  for (let i = 0; i < allScores.length; i++) {
    allScores[i].textContent = 0;
  }
  const allCurrScores = document.querySelectorAll('.current-score');
  for (let i = 0; i < allCurrScores.length; i++) {
    allCurrScores[i].textContent = 0;
  }

  activePlayer = 0;
  currentScore = 0;
  player0Score = 0;
  player1Score = 0;
};

btnRoll.addEventListener('click', btnRollClick);
btnHold.addEventListener('click', btnHoldClick);
btnNew.addEventListener('click', btnNewClick);
