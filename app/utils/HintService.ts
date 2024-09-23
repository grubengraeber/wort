import Hint from "../data/Hint";
import StorageService from "./StorageService";

class HintService {
    storageService: StorageService;

    constructor(storageService: StorageService) {
        this.storageService = storageService;
    }

    getHints(gameId: string): Hint[] {
        const game = this.storageService.getGameById(gameId);
        return game ? game.hints : [];
    }

    addHint(gameId: string, hint: Hint): boolean {
        const game = this.storageService.getGameById(gameId);
        if (!game) {
            return false
        }
        game.hints.push(hint);
        this.storageService.updateGame(game);
        return true;
    }

    updateHint(gameId: string, hint: Hint): boolean {
        const game = this.storageService.getGameById(gameId);
        if (!game) {
            return false
        }
        const index = game.hints.findIndex((h: Hint) => h.id === hint.id);
        game.hints[index] = hint;
        this.storageService.updateGame(game);
        return true;
    }

    deleteHint(gameId: string, hintId: string): boolean {
        const game = this.storageService.getGameById(gameId);
        if (!game) {
            return false
        }
        const index = game.hints.findIndex((h: Hint) => h.id === hintId);
        game.hints.splice(index, 1);
        this.storageService.updateGame(game);
        return true;
    }
}

export default HintService;