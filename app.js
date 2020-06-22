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
        let dice = Math.floor(Math.random() * 6 + 1);
        let diceDOM = document.querySelector('.dice');
        let currentScoreDOM = document.getElementById('current-' + activePlayer);
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        if (dice === 1) {
            nextPlayer();
        } else if (dice == 6) {
            count++;
            if (previousDice === dice && count === 2) {
                roundScore = 0; 
                count = 0; 
                currentScoreDOM.textContent = 0;
                scores[activePlayer] = 0;
                document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
                count = 0;
                nextPlayer();
            } else {
                roundScore += dice;
                currentScoreDOM.textContent = roundScore;
            }
        } else {
            roundScore += dice;
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
        let winningScore = document.querySelector('.input-score').value;
        winningScore = winningScore == "" ? 100 : winningScore;
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner';
            document.querySelector('.dice').style.display = 'none';
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
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
}

function nextPlayer() {
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    activePlayer = activePlayer === 0 ? 1 : 0;
    roundScore = 0;
}

