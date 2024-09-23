import Game from "../data/Game";

class StorageService {

    gamesTableName = 'games';
    currentGameTableName = 'currentGame';

    getGames(): Game[] {
        const response = localStorage.getItem(this.gamesTableName);
        return response ? JSON.parse(response).map((game: any) => Game.fromJSON(game)) : [];
    }

    saveGames(games: Game[]) {
        localStorage.setItem(this.gamesTableName, JSON.stringify(games.map((game) => game.toJSON())));

    }

    addGame(game: Game) {
        const games = this.getGames();
        games.push(game);
        this.saveGames(games);
    }

    getGameById(id: string) {
        const games = this.getGames();
        return games.find((game: Game) => game.id === id);
    }

    updateGame(game: Game) {
        const games = this.getGames();
        const index = games.findIndex((g: Game) => g.id === game.id);
        games[index] = game;
        this.saveGames(games);
    }

    deleteGame(id: string) {
        const games = this.getGames();
        const index = games.findIndex((g: Game) => g.id === id);
        games.splice(index, 1);
        this.saveGames(games);
    }

    addCurrentGame(game: Game) {
        localStorage.setItem(this.currentGameTableName, JSON.stringify(game.id));
    }

    getCurrentGame(): Game | null {
        const id = localStorage.getItem(this.currentGameTableName);
        if (!id) {
            return null;
        }
        return this.getGameById(id) ?? null;
    }

    removeCurrentGame() {
        localStorage.removeItem(this.currentGameTableName);
    }

}

export default StorageService;