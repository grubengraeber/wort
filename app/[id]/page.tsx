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

  const storageService = new StorageService();
  const guessService = new GuessService(storageService);

  const [word, setWord] = useState<string>("");
  const [game, setGame] = useState<Game | undefined>(storageService.getGameById(params.id));
  const [guesses, setGuesses] = useState<Guess[]>([]);

  useEffect(() => {
    const currentGame = storageService.getGameById(params.id);
    if (!currentGame) {
      router.push('/');
      return
    }

    storageService.addCurrentGame(currentGame);
    setGame(currentGame);
    getGuesses();
  }, []);

  const getGuesses = () => {
    if (game) {
      const guesses = guessService.getGuesses(game.id);
      setGuesses(guesses);
    }
  }
  

  return (
    <div>
    <div className='h-[100vh]'>
      <Button onClick={() => router.push('/')}>Back to menu</Button>
    {
      game ?    
      (<div className="text-center">
        <h1 className="text-8xl">Let's Play</h1>
        <NewWord word={word} setWord={setWord} guesses={guesses} game={game} />
        <GuessTable guesses={guesses} setGuesses={setGuesses} currentGame={game} />
      </div>)
      : 
      (<div className="text-center">
        <h1 className="text-8xl">Let's Play</h1>
        <p>Game not found</p>
      </div>)
  }
  </div>
  <h4>Your word is: "{ game?.word}"</h4>
  </div>
  )
}

export default LetsPlay
