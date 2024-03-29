import { useState } from "react"

import Player from "./cmps/Player"
import GameBoard from "./cmps/GameBoard"
import Log from "./Log"
import { WINNING_COMBINATIONS } from "./winning-combinations"
import GameOver from "./GameOver"


const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function deriveActivePlayer(gameTurns) {
  let currPlayer = 'X'

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currPlayer = 'O'
  }

  return currPlayer
}

function App() {
  // const [activePlayer, setActivePlayer] = useState('X')
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState({
    'X': 'Player 1',
    'O': 'Player 2'
  });

  const activePlayer = deriveActivePlayer(gameTurns)

  let gameBoard = [...initialGameBoard.map(arr => [...arr])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player
  }

  let winner;

  for (const combo of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combo[0].row][combo[0].column]
    const secondSquareSymbol = gameBoard[combo[1].row][combo[1].column]
    const thirdSquareSymbol = gameBoard[combo[2].row][combo[2].column]

    if (firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((currActivePlayer) => currActivePlayer === 'X' ? 'O' : 'X')
    setGameTurns(prevTurns => {
      const currPlayer = deriveActivePlayer(prevTurns)

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currPlayer },
        ...prevTurns]

      return updatedTurns
    })
  }

  function handleRestart() {
    setGameTurns([])
  }

  function handlePlayerNameChanged(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  return (

    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChanged}
          />

          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChanged}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
