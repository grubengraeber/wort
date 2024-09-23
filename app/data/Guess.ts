class Guess {
    id: string;
    text: string;
    amountOfCorrectLetters: number;

    constructor(id: string, text: string, amountOfCorrectLetters: number) {
        this.id = id;
        this.text = text;
        this.amountOfCorrectLetters = amountOfCorrectLetters;
    }

    static fromJSON(json: {id: string, text: string, amountOfCorrectLetters: number}): Guess {
        return new Guess(
            json.id,
            json.text,
            json.amountOfCorrectLetters
        );
    }

    toJSON(): {id: string, text: string, amountOfCorrectLetters: number} {
        return {
            id: this.id,
            text: this.text,
            amountOfCorrectLetters: this.amountOfCorrectLetters
        }
    }
}

export default Guess;