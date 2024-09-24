import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import StorageService from '../../utils/StorageService';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Game from '../../data/Game';
import { uuid } from 'uuidv4';
import { toast } from 'sonner';
import SuggestionService from '../../utils/SuggestionService';

function NewGameForm() {

    const router = useRouter();
    
    const storageService = new StorageService();
    const suggestionService = new SuggestionService();

    const [word, setWord] = useState<string>("");
    const [modalOpen, setModalOpen] = useState<boolean>(false);


    const getSugestion = () => {
        const suggestion = suggestionService.getInitialWordSuggestion();
        setWord(suggestion);
    }

    const handleNewGame = () => {
        setModalOpen(true);
    }

    const handleSubmit = () => {
        if (word === "" || word.length !== 4 || !word.match(/^[a-zA-Z]+$/)) {
            toast.error("Please enter a word containing 4 letters and only letters");
            return;
        }
        const newGame = new Game([], word, [], uuid());
        storageService.addGame(newGame);
        storageService.addCurrentGame(newGame);
        setModalOpen(false);
        router.push(`/${newGame.id}`);
    }

  return (
    <div>
        <Dialog open={modalOpen} defaultOpen={false} onOpenChange={() => setModalOpen(!modalOpen)}>
            <DialogTrigger asChild>
                <Button onClick={handleNewGame}>Create new game</Button>
            </DialogTrigger>

            <DialogContent>
            <DialogHeader>
                <DialogTitle>Create new game</DialogTitle>
                <DialogDescription>Enter a word containing 4 letters</DialogDescription>
            </DialogHeader>
                <Input placeholder="Enter a word" value={word} onChange={(e) => setWord(e.target.value)} />
                <Button onClick={getSugestion}>Suggestion</Button>
            <DialogFooter>
                <Button onClick={() => {
                    setModalOpen(false);
                    setWord("");
                }}>Cancel</Button>
                <Button onClick={handleSubmit}>Create</Button>
            </DialogFooter>
            </DialogContent>

        </Dialog>


    </div>
  )
}

export default NewGameForm
