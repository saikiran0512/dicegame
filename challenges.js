/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores = [0, 0];
let roundScore = 0;
let activePlayer = 0;
let playing;
let previousDice = 0;
let count = 0;


resetGame();

function btn() {
    if (playing) {
        let dice1 = Math.floor(Math.random() * 6 + 1);
        let dice2 = Math.floor(Math.random() * 6 + 1);
        let diceDOM1 = document.querySelector('.dice-1');
        let diceDOM2 = document.querySelector('.dice-2');
        let currentScoreDOM = document.getElementById('current-' + activePlayer);
        diceDOM1.style.display = 'block';
        diceDOM1.src = 'dice-' + dice1 + '.png';
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + dice2 + '.png';
        if (dice1 === 1 || dice2 === 1) {
            nextPlayer();
        } else {
            roundScore += dice1 + dice2;
            currentScoreDOM.textContent = roundScore;
        }
        previousDice = dice;

    }
}


document.querySelector('.btn-roll').addEventListener('click', btn);

document.querySelector('.btn-hold').addEventListener('click', () => {
    if (playing) {
        scores[activePlayer] = scores[activePlayer] + roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner';
            document.querySelector('.dice-1').style.display = 'none';
            document.querySelector('.dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.btn-roll').setAttribute('disable', true);
            document.querySelector('.btn-hold').setAttribute('disable', true);
            playing = false;
        }
        else {
            nextPlayer();
        }
    }
});


document.querySelector('.btn-new').addEventListener('click', resetGame);


function resetGame() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    playing = true;
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.btn-roll').removeAttribute('disable');
    document.querySelector('.btn-hold').removeAttribute('disable');
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.dice-1').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
}

function nextPlayer() {
    document.querySelector('.dice-1').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    activePlayer = activePlayer === 0 ? 1 : 0;
    roundScore = 0;
}

