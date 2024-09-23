import React from 'react'
import Game from '../data/Game'
import { Card, CardDescription, CardHeader } from '@/components/ui/card'
import { useRouter } from 'next/navigation';

function GameCard({ game }: { game: Game }) {
    const router = useRouter();
  return (
      <Card onClick={() => {
        router.push(`/${game.id}`);
      }}>
        <CardHeader>
            <h1>{game.word}</h1>
        </CardHeader>
        <CardDescription>Guesses: {game.guesses.length}</CardDescription>
      </Card>
  )
}

export default GameCard
