import React, { useState, useEffect } from "react";
import GridDisplay from "./GridDisplay";
import { findStartPosition } from "./pathFinder.utils";
import "./PathFinder.css";

const initialGrid: string[][] = [
  [">", "-", "-", "-", "A", "-", "@", "-", "+"],
  [" ", " ", " ", " ", " ", " ", " ", " ", "|"],
  ["+", "-", "U", "-", "+", " ", " ", " ", "C"],
  ["|", " ", " ", " ", "|", " ", " ", " ", "|"],
  ["s", " ", " ", " ", "C", "-", "-", "-", "+"],
];

const PathFinder: React.FC = () => {
  const [currentPosition, setCurrentPosition] = useState(
    findStartPosition(initialGrid)
  );
  const [path, setPath] = useState("@");
  const [letters, setLetters] = useState("");

  const move = (direction: { row: number; col: number }) => {
    const newRow = currentPosition.row + direction.row;
    const newCol = currentPosition.col + direction.col;

    if (
      newRow >= 0 &&
      newRow < initialGrid.length &&
      newCol >= 0 &&
      newCol < initialGrid[newRow].length
    ) {
      const newChar = initialGrid[newRow][newCol];

      if (newChar !== " " && path.slice(-1) !== "s") {
        setCurrentPosition({ row: newRow, col: newCol });

        if (newChar === "s") {
          setPath((prevPath) => prevPath + "s");
          return;
        }

        if (/[A-Z]/.test(newChar)) {
          setLetters((prevLetters) => prevLetters + newChar);
        }

        setPath((prevPath) => prevPath + newChar);
      }
    }
  };

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (path.slice(-1) === "s") return;

      switch (event.key) {
        case "ArrowUp":
          move({ row: -1, col: 0 });
          break;
        case "ArrowDown":
          move({ row: 1, col: 0 });
          break;
        case "ArrowLeft":
          move({ row: 0, col: -1 });
          break;
        case "ArrowRight":
          move({ row: 0, col: 1 });
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [currentPosition, path]);

  return (
    <div className="path-finder">
      <GridDisplay grid={initialGrid} currentPosition={currentPosition} />

      <div className="buttons">
        <button
          className="move-button"
          onClick={() => move({ row: 0, col: 1 })}
        >
          Move Right
        </button>
        <button
          className="move-button"
          onClick={() => move({ row: 0, col: -1 })}
        >
          Move Left
        </button>
        <button
          className="move-button"
          onClick={() => move({ row: 1, col: 0 })}
        >
          Move Down
        </button>
        <button
          className="move-button"
          onClick={() => move({ row: -1, col: 0 })}
        >
          Move Up
        </button>
      </div>
      <div className="info">
        <h2>Path:</h2>
        <p className="path">{path}</p>
        <h2>Letters:</h2>
        <p className="letters">{letters}</p>
      </div>
    </div>
  );
};

export default PathFinder;
