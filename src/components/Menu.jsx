
import React, { useState } from 'react';
import Button from './Button';

function Menu({ onStart }) {
  const [isComputerMode, setIsComputerMode] = useState(false);
  const [mode, setMode] = useState("Easy");
  const [player, setPlayer] = useState("User");

  const handleStart = () => {
    onStart({ isComputerMode, mode, player });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
      <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-orange-500">Tic Tac Toe</h1>

        {/* Game Mode */}
        <div className="mb-6">
          <label className='text-lg font-medium block mb-4 text-gray-700'>Game Mode:</label>
          <div className='flex gap-4'>
            <Button 
              isSelected={!isComputerMode}
              onClick={() => setIsComputerMode(false)}
              label={"Player vs Player"}
              color={"bg-teal-600"} 
            />
            <Button 
              isSelected={isComputerMode}
              onClick={() => setIsComputerMode(true)}
              label={"Player vs Computer"}
              color={"bg-teal-600"} 
            />
          </div>
        </div>

        {/* Who Starts and Difficulty */}
        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isComputerMode ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
          {isComputerMode && (
            <div>
              <div className='mb-6'>
                <label className='text-lg font-medium block mb-4 text-gray-700'>Who Starts:</label>
                <div className='flex gap-4'>
                  <Button 
                    isSelected={player === "User"}
                    color={"bg-indigo-600"}
                    onClick={() => setPlayer("User")}
                    label={"User"}
                  />
                  <Button 
                    isSelected={player === "Computer"}
                    color={"bg-indigo-600"}
                    onClick={() => setPlayer("Computer")} 
                    label={"Computer"}               
                  />
                </div>
              </div>

              <div className='mb-6'>
                <label className='text-lg font-medium block mb-4 text-gray-700'>Difficulty:</label>
                <div className='flex gap-4'>
                  <Button 
                    isSelected={mode === "Easy"}
                    color={"bg-green-500"}
                    onClick={() => setMode("Easy")}
                    label={"Easy"}
                  />
                  <Button 
                    isSelected={mode === "Hard"}
                    color={"bg-red-500"}
                    onClick={() => setMode("Hard")} 
                    label={"Hard"}               
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Start Button */}
        <button
          className="w-full bg-teal-600 text-white font-semibold text-lg py-3 rounded-lg shadow-xl hover:bg-teal-700"
          onClick={handleStart}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}

export default Menu;
