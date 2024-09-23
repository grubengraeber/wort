import React, { useEffect, useState } from 'react'
import Game from '../data/Game';
import StorageService from '../utils/StorageService';

function GameMenu() {
    const storageService = new StorageService();

    const [games, setGames] = useState<Game[]>([]);
    useEffect(() => {
        getGames();
    }, [])

    const getGames = () => {
        const games = storageService.getGames();
        setGames(games);
    }

    return (
        /* Let the user pick a game from games */
        <div>
        
        </div>
    )
}

export default GameMenu
