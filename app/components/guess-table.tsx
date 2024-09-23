import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'
import Guess from '../data/Guess';
import { toast } from 'sonner';
import GuessService from '../utils/GuessService';
import Game from '../data/Game';
import StorageService from '../utils/StorageService';

function GuessTable({ guesses, setGuesses, currentGame }: {guesses: {id: string, text: string, amountOfCorrectLetters: number}[], setGuesses: (newGuesses: Guess[]) => void, currentGame: Game}) {

    const storageService = new StorageService();
    const guessService = new GuessService(storageService);

    const handleAskDelete = (id: string) => {
        const response = confirm("Are you sure you want to delete this guess?");
        if (response) {
          handleDelete(id);
        }
    };

    const handleDelete = (id: string) => {
        guessService.deleteGuess(currentGame.id, id);
        const newGuesses = guesses.map((guess) => Guess.fromJSON(guess)).filter((guess) => guess.id !== id);
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
