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
    if (window) {
      const newStorageService = new StorageService();
      tempraryStorageService = newStorageService;
      setStorageService(newStorageService);
      setGuessService(new GuessService(newStorageService));
    }
    else {
      router.push('/');
      return
    }

    const currentGame = tempraryStorageService.getGameById(params.id);
    console.log(currentGame);
    if (!currentGame) {
      router.push('/');
      return
    }

    tempraryStorageService.addCurrentGame(currentGame);
    setGame(currentGame);
    getGuesses();
  }, []);

  const getGuesses = () => {
    if (game) {
      const guesses = guessService?.getGuesses(game.id);
      setGuesses(guesses ?? []);
    }
  }
  

  return (
    <div>
    <div className='h-[100vh]'>
      <Button onClick={() => router.push('/')}>Back to menu</Button>
    {
      game ?    
      (<div className="text-center">
        <h1 className="text-8xl">Let&apos;s Play</h1>
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
