import React from "react";

function Button({ isSelected, color, label, onClick }) {
  const buttonClass = (isSelected, color) => {
    return `px-4 py-2 rounded-lg font-semibold text-lg ${
      isSelected
        ? `${color} text-white shadow-xl`
        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
    } transition-all duration-300`; // Fixed missing space
  };

  return (
    <button className={buttonClass(isSelected, color)} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;