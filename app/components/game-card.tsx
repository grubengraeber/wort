import React, { useEffect, useState } from 'react'
import Game from '../data/Game'
import { Card, CardDescription, CardHeader } from '@/components/ui/card'
import { useRouter } from 'next/navigation';
import StorageService from '../utils/StorageService';

function GameCard({ game, games }: { game: Game, games: Game[] }) {
  const [storageService, setStorageService] = useState<StorageService>();
  const router = useRouter();

  useEffect(() => {
    if (window) {
      const newStorageService = new StorageService();
      setStorageService(newStorageService);
    }
  }, []);

  const openRemoveModal = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    const response = confirm("Are you sure you want to delete this game?");
    if (response) {
      removeGame(game);
    }
  }

  const removeGame = (game: Game) => {
    games = games.filter((g) => g.id !== game.id);
    storageService?.deleteGame(game.id);
  }

  return (
      <Card onClick={() => {
        router.push(`/${game.id}`);
      }} onContextMenu={(event) => openRemoveModal(event)}>
        <CardHeader>
            <h1>{game.word}</h1>
        </CardHeader>
        <CardDescription>Guesses: {game.guesses.length}</CardDescription>
      </Card>
  )
}

export default GameCard
