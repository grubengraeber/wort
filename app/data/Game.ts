import Guess from "./Guess";
import Hint from "./Hint";

class Game {
    id: string;
    guesses: Guess[];
    word: string;
    hints: Hint[];
    createdAt: Date;

    constructor(guesses: Guess[], word: string, hints: Hint[], id: string, createdAt?: Date) {
        this.guesses = guesses;
        this.word = word;
        this.hints = hints;
        this.id = id;
        this.createdAt = createdAt || new Date();
    }

    static fromJSON(json: Game): Game {
        return new Game(
            json.guesses.map((guess: Guess) => Guess.fromJSON(guess)),
            json.word,
            json.hints.map((hint: Hint) => Hint.fromJSON(hint)),
            json.id,
            new Date(json.createdAt)
        );
    }

    toJSON(): {guesses: Guess[], word: string, hints: Hint[], id: string, createdAt: string} {
        return {
            guesses: this.guesses.map((guess) => guess.toJSON()),
            word: this.word,
            hints: this.hints.map((hint) => hint.toJSON()),
            id: this.id,
            createdAt: this.createdAt.toISOString()
        }
    }

}

export default Game;