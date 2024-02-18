import { useState } from "react"

import Player from "./cmps/Player"
import GameBoard from "./cmps/GameBoard"
import Log from "./Log"

function App() {
  const [activePlayer, setActivePlayer] = useState('X')
  const [gameTurns, setGameTurns] = useState([])

  function handleSelectSquare(rowIndex, colIndex,) {
    setActivePlayer((currActivePlayer) => currActivePlayer === 'X' ? 'O' : 'X')
    setGameTurns(prevTurns => {
      let currPlayer = 'X'

      if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
        currPlayer = 'O'
      }

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currPlayer },
        ...prevTurns]

      return updatedTurns
    })
  }

  return (

    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
      </div>
      <Log />
    </main>
  )
}

export default App
