import React from 'react'
import Game from '../../data/Game'

function AllHints({ game }: { game: Game }) {
  return (
    <>
      {
        game.hints.length > 0 ?
          <div className='bg-white rounded-md p-5'>
            <h2 className='text-lg font-bold'>Hints</h2>
            <div className='space-y-2'>
              {
                game.hints.map((hint) => {
                  return (
                    <div key={hint.id} className='flex justify-between'>
                      <p>
                        {hint.mustInclude ? "Must include the letter: " : "Should not include the letters: "}{hint.letters} on position: {hint.position}
                      </p>
                    </div>
                  )
                })
              }
            </div>
          </div>
          :
          null
      }
    </>

  )
}

export default AllHints
