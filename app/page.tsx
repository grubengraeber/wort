"use client"

import { useState } from "react";
import StorageService from "./utils/StorageService";
import Game from "./data/Game";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import NewGameForm from "./components/new-game-form";
import AllGames from "./components/all-games";

export default function Home() {

  const router = useRouter();

  const storageService = new StorageService();
  const [allGames, setAllGames] = useState<Game[]>(storageService.getGames());
  

  return (
    <div className="text-center">
      {
        storageService.getCurrentGame() ?
        <Button onClick={() => {
          router.push(`/${storageService.getCurrentGame()?.id}`);
        }}>Go to current game</Button>
        :
        null
      }

      {
        allGames.length > 0 ?
        <AllGames allGames={allGames} />
        :
        null
      }
      <NewGameForm />

    </div>
  );
}
