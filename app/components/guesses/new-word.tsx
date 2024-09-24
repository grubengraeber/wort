import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import Guess from '../../data/Guess';
import { uuid } from 'uuidv4';
import StorageService from '../../utils/StorageService';
import GuessService from '../../utils/GuessService';
import Game from '../../data/Game';
import SuggestionService from '../../utils/SuggestionService';

function NewWord({word, setWord, guesses, game}: {word: string, setWord: (newWord: string) => void, guesses: Guess[], game: Game}) {
    const storageService = new StorageService();
    const guessService = new GuessService(storageService);

    const [suggestionService, setSuggestionService] = useState<SuggestionService>(new SuggestionService());

    useEffect(() => {
      setSuggestionService(new SuggestionService());
    }, [word]);

    const handleReset = () => {
        setWord("");
      };


    const addWord = () => {
        if (word === "" || word.length !== 4) {
          toast.error("Please enter a word containing 4 letters");
          return;
        }

        if (game.guesses.map((guess) => guess.text).includes(word)) {
          toast.error("This word has already been guessed");
          return;
        }

        const newUUID = uuid();
        const newGuess = new Guess(newUUID, word, 0);
        guessService.addGuess(game.id, newGuess);
        guesses.push(newGuess);
        setSuggestionService(new SuggestionService());
        handleReset();
      };

      const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      if (newValue.length > 4) {
          toast.error("Please enter a word containing 4 letters");
          return;
      }

      setWord(newValue);
    };

    const suggest = () => {
      const suggestion = suggestionService.getWordSuggestion(game);
      setWord(suggestion);
    };


  return (
    <div className="gird grid-cols-3">
        <Input placeholder="Enter a word" value={word} className="col-span-2" onChange={handleTextChange} />
        <div className='grid-cols-2'>
          <Button onClick={suggest}>Suggestion</Button>
          <Button onClick={addWord}>Submit</Button>
        </div>
    </div>
  )
}

export default NewWord
