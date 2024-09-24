import Game from '@/app/data/Game';
import Guess from '@/app/data/Guess';
import Hint from '@/app/data/Hint';
import GuessService from '@/app/utils/GuessService';
import HintService from '@/app/utils/HintService';
import StorageService from '@/app/utils/StorageService';
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'
import { toast } from 'sonner';
import { uuid } from 'uuidv4';


function GuessTable({ guesses, setGuesses, currentGame }: {guesses: {id: string, text: string, amountOfCorrectLetters: number}[], setGuesses: (newGuesses: Guess[]) => void, currentGame: Game}) {

    const storageService = new StorageService();
    const guessService = new GuessService(storageService);
    const hintService = new HintService(storageService);

    const handleAskDelete = (id: string) => {
        const response = confirm("Are you sure you want to delete this guess?");
        if (response) {
          handleDelete(id);
        }
    };

    const handleDelete = (id: string) => {
        guessService.deleteGuess(currentGame.id, id);
        const newGuesses = guesses.map((guess: {id: string, text: string, amountOfCorrectLetters: number}) => Guess.fromJSON(guess)).filter((guess) => guess.id !== id);
        setGuesses(newGuesses);
    }

    const changeCorrectAmountOfLetters = (id: string, newValue: string) => {
        if (newValue === "" || isNaN(parseInt(newValue)) || parseInt(newValue) > 4) {
          toast.error("Please enter a number smaller than or equal to 4");
          return;
        }
        const guess = guesses.find((guess) => guess.id === id);
        if (guess) {
          guess.amountOfCorrectLetters = parseInt(newValue);
          guessService.updateGuess(currentGame.id, Guess.fromJSON(guess));
          setGuesses([...guesses.map((guess) => Guess.fromJSON(guess))]);
          if (newValue === "0") {
            
            const hints = [
              new Hint(uuid(), parseInt(newValue), [guess.text[0]], false),
              new Hint(uuid(), parseInt(newValue), [guess.text[1]], false),
              new Hint(uuid(), parseInt(newValue), [guess.text[2]], false),
              new Hint(uuid(), parseInt(newValue), [guess.text[3]], false),
            ];
          hints.forEach((hint) => hintService.addHint(currentGame.id, hint));
          }
        }
      };


  return (
    <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Word</TableHead>
            <TableHead>Correct Letters</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {guesses.map((guess) => (
            <TableRow key={guess.text} onDoubleClick={() => handleAskDelete(guess.id)}>
              <TableCell>{guess.text}</TableCell>
              <TableCell>
                <Input value={guess.amountOfCorrectLetters} onChange={(event) => changeCorrectAmountOfLetters(guess.id, event.target.value)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  )
}

export default GuessTable
