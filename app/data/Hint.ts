class Hint {
    id: string;
    position: number;
    letters: string[];
    mustInclude: boolean;

    constructor(id: string, position: number, letters: string[], mustInclude: boolean) {
        this.id = id;
        this.position = position;
        this.letters = letters;
        this.mustInclude = mustInclude;
    }

    static fromJSON(json: {id: string, position: number, letters: string[], mustInclude: boolean}): Hint {
        return new Hint(
            json.id,
            json.position,
            json.letters,
            json.mustInclude
        );
    }

    toJSON(): {id: string, position: number, letters: string[], mustInclude: boolean} {
        return {
            id: this.id,
            position: this.position,
            letters: this.letters,
            mustInclude: this.mustInclude
        }
    }
}

export default Hint;