import React, { useEffect, useState } from 'react';
import Square from './Square';

const Board = ({ isComputerMode, player, mode, backToMenu }) => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(player === 'User');
  const [winner, setWinner] = useState(null);

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
        return squares[a];
      }
    }
    return squares.every((square) => square !== null) ? "Draw" : null;
  };

  const handleClick = (index) => {
    if (squares[index] || winner) return;
    const newSquares = squares.slice();
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
    setWinner(checkWinner(newSquares));
  };

  const minMax = (squares, depth, isComp, alpha, beta) => {
    const result = checkWinner(squares);
    if (result) {
      return result === 'O' ? 10 - depth : result === 'X' ? depth - 10 : 0;
    }

    if (isComp) {
      let maxScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (!squares[i]) {
          squares[i] = 'O';
          maxScore = Math.max(maxScore, minMax(squares, depth + 1, false, alpha, beta));
          squares[i] = null;
          alpha = Math.max(alpha, maxScore);
          if (beta <= alpha) break;
        }
      }
      return maxScore;
    } else {
      let minScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (!squares[i]) {
          squares[i] = 'X';
          minScore = Math.min(minScore, minMax(squares, depth + 1, true, alpha, beta));
          squares[i] = null;
          beta = Math.min(beta, minScore);
          if (beta <= alpha) break;
        }
      }
      return minScore;
    }
  };

  const bestMove = () => {
    let bestScore = -Infinity;
    let move = -1;
    for (let i = 0; i < 9; i++) {
      if (!squares[i]) {
        squares[i] = 'O';
        const score = minMax(squares, 0, false, -Infinity, Infinity);
        squares[i] = null;
        if (bestScore < score) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  };

  const randomMove = () => {
    const availableMoves = squares
      .map((v, i) => (v === null ? i : null))
      .filter((i) => i != null);
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  };

  const computerMove = () => {
    const move = mode === 'Easy' ? randomMove() : bestMove();
    const newSquares = squares.slice();
    newSquares[move] = 'O';
    setSquares(newSquares);
    setIsXNext(true);
    setWinner(checkWinner(newSquares));
  };

  useEffect(() => {
    if (!isXNext && isComputerMode && !winner) {
      const timeout = setTimeout(() => computerMove(), 500);
      return () => clearTimeout(timeout);
    }
  }, [isXNext, squares, isComputerMode, mode, winner]);

  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(player === 'User');
    setWinner(null);
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-purple-500 to-indigo-600 min-h-screen p-6 relative">
      <button
        className="absolute top-4 left-4 text-white bg-indigo-700 p-3 rounded-full hover:bg-indigo-900"
        onClick={backToMenu}
      >
        ←
      </button>
      <div className="flex flex-col items-center">
        <div
          className={`mb-4 text-4xl font-semibold ${
            winner
              ? winner === 'Draw'
                ? 'text-yellow-500'
                : winner === 'O'
                ? 'text-red-500'
                : 'text-green-500'
              : 'text-white'
          }`}
        >
          {winner ? (winner === 'Draw' ? "It's a Draw!" : `${winner} Wins!`) : `Next Player: ${isXNext ? 'X' : 'O'}`}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {squares.map((value, index) => (
            <Square
              key={index}
              value={value}
              onClick={() => handleClick(index)}
              className="w-24 h-24 bg-white text-4xl font-bold flex items-center justify-center"
              style={{
                color: value === 'X' ? '#4CAF50' : value === 'O' ? '#F44336' : 'black',
              }}
            />
          ))}
        </div>
        <button
          className="mt-6 px-6 py-3 text-xl bg-green-500 text-white rounded-lg hover:bg-green-600"
          onClick={restartGame}
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default Board;