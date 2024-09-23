import Game from "../data/Game";

class SuggestionService {
    getInitialWordSuggestion(): string {
        const words = ["Wort", "Test", "Zeit", "Haus", "Auto", "Hund", "Kind", "Mann", "Frau", "Buch", "Sohn", "Sohn"];
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
    }

    getWordSuggestion(game: Game): string {
        console.log(game);
        return "Test";
    }
}

export default SuggestionService;