
import React, { useState } from 'react'
import Menu from './components/Menu'
import Board from './components/Board'

function App() {
  const [gameStart, setGamestart] = useState(false)
  const [isComputerMode, setIsComputerMode] = useState(false)
  const [mode, setMode] = useState("Easy")
  const [player, setPlayer] = useState("User")

  const startGame = ({isComputerMode, mode, player}) => {
    setGamestart(true)
    setIsComputerMode(isComputerMode)
    setPlayer(player)
    setMode(mode)
  }

  const goToMenu = () => {
    setGamestart(false)
  }

  return (
    <div className='text-center'>
      {!gameStart?(
        <Menu onStart={startGame}/>
      ):(
        <Board
          isComputerMode = {isComputerMode}
          mode = {mode}
          player = {player}
          backToMenu={goToMenu}        
        />
      )}
    </div>
  )
}

export default App
