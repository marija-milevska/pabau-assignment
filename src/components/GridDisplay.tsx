import React from "react";
import "./GridDisplay.css";

interface GridDisplayProps {
  grid: string[][];
  currentPosition: { row: number; col: number };
}

const GridDisplay: React.FC<GridDisplayProps> = ({ grid, currentPosition }) => {
  return (
    <div className="grid-display">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {row.map((cell, cellIndex) => (
            <span
              key={cellIndex}
              className={`grid-cell ${
                currentPosition.row === rowIndex &&
                currentPosition.col === cellIndex
                  ? "current"
                  : ""
              }`}
            >
              {cell === " " ? "\u00A0" : cell}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GridDisplay;
