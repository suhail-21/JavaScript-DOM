/*GAME RULES

- The game has two players, playing in rounds.
- In each turn, a player rolls dice as many as times. Each result get added to his/her round score.
- But if the player rolls 1, all his/her round score  gets lost. After that, it's the next player's turn.
- The player can chose to 'hold', which means that his/her round score gets added to his/her global score
  after that, it's the next player's turn.
- The first player to reach 100 points in global score wins the game. */

let scores, roundscores, activePlayer, gamePlaying;     //declaring variables.

init();

document.querySelector('.btn--roll').addEventListener('click', function(){
    if(gamePlaying){
        //1.Random number
        let dice = Math.floor(Math.random() * 6) + 1;   /*To generate random number, Math.random is used. But it will only
                                                            generate random number between 0 and 1 also in decimal value. 
                                                            To remove decimal, math.floor is used and then in order to 
                                                            generate random number between 1 and 6, math.random *6 +1 is
                                                            used.*/

        //2.Display the result
        let diceDom = document.querySelector('.dice');
        diceDom.style.display = 'block';
        diceDom.src = 'dice-' + dice + '.png';

        //3.Update the round score if the rolled number is not 1
        if(dice !== 1){
        //add score
        roundscores += dice;
        document.querySelector('#current--' + activePlayer).textContent = roundscores;
        }
        else{
        //next player
        nextPlayer();
        }
    }
    
});

document.querySelector('.btn--hold').addEventListener('click', function(){
    if(gamePlaying){
        //1. Add current score to global score
        scores[activePlayer] += roundscores;
        //2. Update the ui
        document.getElementById('score--' + activePlayer).textContent = scores[activePlayer];
        //4. Check if player won the game.
        if(scores[activePlayer] >= 20){
            document.querySelector('#name--' + activePlayer).textContent = "Winner";
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player--' + activePlayer).classList.add('player--winner');
            document.querySelector('.player--' + activePlayer).classList.remove('player--active');
            gamePlaying = false;
        }
        else{
            //3. Next player
            nextPlayer();
        }
    }
});

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundscores = 0;
    document.getElementById('current--1').textContent = 0;
    document.getElementById('current--0').textContent = 0;
    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active');
    /*document.querySelector('.player--0').classList.remove('player--active'); 
    document.querySelector('.player--1').classList.add('player--active');*/
    document.querySelector('.dice').style.display = 'none';
}


document.querySelector('.btn--new').addEventListener('click', init);

function init(){
    gamePlaying = true;
    scores = [0, 0];             //Initialising variables.
    roundscores = 0;
    activePlayer = 0;            //To keep track of current player rolling dice. 1 - player rolling, 0 - player not rolling.
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score--0').textContent = '0';
    document.getElementById('score--1').textContent = '0';
    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';
    document.getElementById('name--0').textContent = 'Player 1';
    document.getElementById('name--1').textContent = 'Player 2';
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');
}