
import React from 'react'

const Square = ({ value, onClick }) => {

  const getColor = (value) => {
    if (value === "X") return "text-blue-500";
    if (value === "O") return "text-red-500";
    return "text-gray-500";
  }

  return (
    <button
      className={`w-20 h-20 text-4xl font-bold border-2 border-gray-300 flex items-center justify-center cursor-pointer ${getColor(value)}`}
      onClick={onClick}
    >
      {value}
    </button>
  )
}

export default Square;
