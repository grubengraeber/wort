import React from 'react'
import Game from '../data/Game';
import GameCard from './game-card';

function AllGames({allGames}: {allGames: Game[]}) {

    return (
        <div>
            {
                allGames.map((game) => {
                    return (
                        <div className='w-full' key={game.id}>
                            <GameCard game={game} games={allGames} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default AllGames
