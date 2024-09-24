import Game from "../data/Game";

type LetterPosition = { letter: string, position: number };

class SuggestionService {
    getAllWords(notPossibleLetters: LetterPosition[]): string[] {
        const woerter = require("all-the-german-words")
        const goodWords = woerter.map((word: string) => word.toLowerCase()).filter((word: string) => {
            return word.length === 4 &&
                word.match(/^[a-zA-Z]+$/) &&
                !notPossibleLetters.filter((letter) => letter.position === 0).map((letter) => letter.letter).includes(word[0]) &&
                !notPossibleLetters.filter((letter) => letter.position === 1).map((letter) => letter.letter).includes(word[1]) &&
                !notPossibleLetters.filter((letter) => letter.position === 2).map((letter) => letter.letter).includes(word[2]) &&
                !notPossibleLetters.filter((letter) => letter.position === 3).map((letter) => letter.letter).includes(word[3]);
        });
        return goodWords;
    }

    getInitialWordSuggestion(): string {
        const words = this.getAllWords([]);
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
    }

    getWordSuggestion(game: Game): string {
        const notPossibleLetters: LetterPosition[] = this.getNotPossibleLetters(game);
        const words = this.getAllWords(notPossibleLetters);
        return words[Math.floor(Math.random() * words.length)];
    }

    getNotPossibleLetters(game: Game): LetterPosition[] {
        const notPossibleLetters: { letter: string, position: number }[] = [];
        const guesses = game.guesses;
        for (const guess of guesses) {
            if (guess.amountOfCorrectLetters === 0) {
                for (const letter of guess.text) {
                    notPossibleLetters.push({ letter: letter.toLowerCase(), position: guess.text.indexOf(letter) });
                }
            }
        }
        return notPossibleLetters;
    }
}

export default SuggestionService;