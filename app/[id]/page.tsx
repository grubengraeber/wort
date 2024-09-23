"use client"

import React, {  useEffect, useState } from 'react'
import StorageService from '../utils/StorageService';
import GuessService from '../utils/GuessService';
import Game from '../data/Game';
import Guess from '../data/Guess';
import NewWord from '../components/new-word';
import GuessTable from '../components/guess-table';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

function LetsPlay({params}: {params: {id: string}}) {

  const router = useRouter();

  const [storageService, setStorageService] = useState<StorageService>();
  const [guessService, setGuessService] = useState<GuessService>();
  const [word, setWord] = useState<string>("");
  const [game, setGame] = useState<Game | undefined>(storageService?.getGameById(params.id));
  const [guesses, setGuesses] = useState<Guess[]>([]);

  useEffect(() => {
    let tempraryStorageService: StorageService | undefined;
    let temporaryGuessService: GuessService | undefined;
    if (window) {
      const newStorageService = new StorageService();
      tempraryStorageService = newStorageService;
      setStorageService(newStorageService);
      temporaryGuessService = new GuessService(newStorageService);
      setGuessService(temporaryGuessService);
    }
    else {
      router.push('/');
      return
    }

    const currentGame = tempraryStorageService.getGameById(params.id);
    if (!currentGame) {
      router.push('/');
      return
    }

    tempraryStorageService.addCurrentGame(currentGame);
    setGame(currentGame);
    getGuesses(temporaryGuessService);
  }, []);

  const getGuesses = (guessService: GuessService) => {
      const guesses = guessService?.getGuesses(params.id);
      setGuesses(guesses ?? []);
  }
  

  return (
    <div className='p-10 space-y-5'>
    <div className='min-h-[100vh]'>
      <Button onClick={() => router.push('/')}>Back to menu</Button>
    {
      game ?    
      (<div className="text-center gap-10">
        <h1 className="text-6xl">Let&apos;s Play</h1>
        <NewWord word={word} setWord={setWord} guesses={guesses} game={game} />
        <GuessTable guesses={guesses} setGuesses={setGuesses} currentGame={game} />
      </div>)
      : 
      (<div className="text-center">
        <h1 className="text-8xl">Let&apos;s Play</h1>
        <p>Game not found</p>
      </div>)
  }
  </div>
  <h4>Your word is: &quot;{ game?.word}&quot;</h4>
  </div>
  )
}

export default LetsPlay
