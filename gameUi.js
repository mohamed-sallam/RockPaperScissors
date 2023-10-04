import { Game, Results } from './game.js'

const ChoiceImages = {
    Player: {
        Rock: 'img/y_rock.png',
        Paper: 'img/y_paper.png',
        Scissors: 'img/y_scissors.png'
    },
    Computer: {
        Rock: 'img/b_rock.png',
        Paper: 'img/b_paper.png',
        Scissors: 'img/b_scissors.png'
    },
    Default: 'img/shadow.png'
};


export class GameUi {
    static game = new Game(GameUi.updateScores, GameUi.showWinner, GameUi.showComputerChoice);

    static updateScores(playerScore, computerScore) {
        document.querySelector('#player-score').textContent = playerScore;
        document.querySelector('#computer-score').textContent = computerScore;
    }

    static showWinner(result) {
        let msg, img;
        switch (result) {
            case Results.LOSE:
                msg = 'You Lose :( !';
                img = 'lose.png';
                break;
            case Results.TIE:
                msg = 'Tie!';
                img = 'lose.png';
                break;
            case Results.WIN:
                msg = 'You Win!';
                img = 'win.png';
                break;
        }

        document.querySelector('body').innerHTML += /*html*/`
            <div class="result" style="position: absolute;left: 0;right: 0;top: 0;bottom: 0;font-size: 77px;font-family: 'Nerko One';background-image: radial-gradient(circle, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%);">
                <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;margin: auto;height: 100vh;color: #ffb222;gap: 8px;">
                    ${msg}
                    <img src="img/${img}" style="width: 34vw;">
                    <button style="background-color: #ffb222;border: 0;border-radius: 50px;padding: 16px 32px;font-weight: 600;font-size: 18px;cursor: pointer;" onclick="GameUi.playAgain()">
                        Play again
                    </button>
                </div>
            </div>
        `;
    }

    static showComputerChoice(choice) {
        document.querySelector('.computer>img').setAttribute('src', ChoiceImages.Computer[choice]);
    }

    static playAgain() {
        document.querySelector('.result').remove(); 
        GameUi.game.reset();
        document.querySelector('.computer>img').setAttribute('src', ChoiceImages.Default);
        document.querySelector('.player>img').setAttribute('src', ChoiceImages.Default);
        GameUi.initGame();
    }

    static initGame() {    
        document.querySelectorAll('button.choice').forEach((element) => {
            element.addEventListener(
                'click',
                () => {
                    const choice = element.getAttribute('data-choice');
                    GameUi.game.play(choice);
                    document.querySelector('.player>img').setAttribute('src', ChoiceImages.Player[choice]);
                }
            )
        });
    }
}