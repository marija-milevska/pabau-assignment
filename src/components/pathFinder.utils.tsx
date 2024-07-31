export interface Position {
  row: number;
  col: number;
}

export const findStartPosition = (grid: string[][]): Position => {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === ">") {
        return { row, col };
      }
    }
  }
  throw new Error("Starting point not found");
};
