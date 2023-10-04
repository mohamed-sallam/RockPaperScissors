const Options = {
    ROCK: 'Rock',
    PAPER: 'Paper',
    SCISSORS: 'Scissors'
};

export const Results = {
    LOSE: -1,
    TIE: 0,
    WIN: 1
};

export class Game {
    _playerScore = 0;
    _computerScore = 0;
    _currentTurn = 0;
    _scoresCallback;
    _resultCallback;
    _computerChoiceCallback;

    constructor(scoresCallback, resultCallback, computerChoiceCallback) {
        this._scoresCallback = scoresCallback;
        this._resultCallback = resultCallback;
        this._computerChoiceCallback = computerChoiceCallback;
    }

    play(playerChoice) {
        if (this._currentTurn < 4) {
            let computerChoice = this._getComputerChoice();
            this._computerChoiceCallback(computerChoice);
            let currentTurnResult = this._playRound(playerChoice, computerChoice);

            if (currentTurnResult === Results.WIN)
                this._increasePlayerScore();
            else if (currentTurnResult === Results.LOSE)
                this._increaseComputerScore();

            ++this._currentTurn;
        } else if (this._playerScore < this._computerScore)
            this._resultCallback(Results.LOSE);
        else if (this._playerScore > this._computerScore)
            this._resultCallback(Results.WIN);
        else
            this._resultCallback(Results.TIE);
    }

    reset() {
        this._playerScore = 0;
        this._computerScore = 0;
        this._currentTurn = 0;
        this._scoresCallback(this._playerScore, this._computerScore);
    }

    _increasePlayerScore() {
        ++this._playerScore;
        this._scoresCallback(this._playerScore, this._computerScore);
    }

    _increaseComputerScore() {
        ++this._computerScore;
        this._scoresCallback(this._playerScore, this._computerScore);
    }

    _getComputerChoice() {
        return [Options.ROCK, Options.PAPER, Options.SCISSORS][Math.floor(Math.random() * 3)];
    }

    _playRound(playerSelection, computerSelection) {
        if (playerSelection === computerSelection)
            return Results.TIE;
        else if ((playerSelection === Options.ROCK && computerSelection === Options.SCISSORS) ||
            (playerSelection === Options.PAPER && computerSelection === Options.ROCK) ||
            (playerSelection === Options.SCISSORS && computerSelection === Options.PAPER))
            return Results.WIN;

        return Results.LOSE;
    }
}
