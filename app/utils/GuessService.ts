import Guess from "../data/Guess";
import StorageService from "./StorageService";

class GuessService {

    storageService: StorageService;

    constructor(storageService: StorageService) {
        this.storageService = storageService;
    }

    getGuesses(gameId: string): Guess[] {
        const game = this.storageService.getGameById(gameId);
        return game ? game.guesses.map((guess) => Guess.fromJSON(guess)) : [];
    }

    addGuess(gameId: string, guess: Guess): boolean {
        const game = this.storageService.getGameById(gameId);
        if (!game) {
            return false
        }
        game.guesses.push(guess);
        this.storageService.updateGame(game);
        return true;
    }

    updateGuess(gameId: string, guess: Guess): boolean {
        const game = this.storageService.getGameById(gameId);
        if (!game) {
            return false
        }
        const index = game.guesses.map((guess) => Guess.fromJSON(guess)).findIndex((g: Guess) => g.id === guess.id);
        game.guesses[index] = guess;
        this.storageService.updateGame(game);
        return true;
    }

    deleteGuess(gameId: string, guessId: string): boolean {
        const game = this.storageService.getGameById(gameId);
        if (!game) {
            return false
        }
        const index = game.guesses.map((guess) => Guess.fromJSON(guess)).findIndex((g: Guess) => g.id === guessId);
        game.guesses.map((guess) => Guess.fromJSON(guess)).splice(index, 1);
        this.storageService.updateGame(game);
        return true;
    }
}

export default GuessService;