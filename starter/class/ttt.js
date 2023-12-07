const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {
  static symbols = {
    x: "X",
    o: "O",
    t: "T",
  };
  constructor() {
    this.playerTurn = "O";

    this.grid = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ];

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand("t", "test command (remove)", TTT.testCommand);

    Screen.render();
  }

  static checkEmpty(grid) {
    const totalEmptyRows = grid.reduce(
      (acc, currentEl) =>
        currentEl.every((cell) => cell === " ") ? acc + 1 : acc + 0,
      0
    );

    return totalEmptyRows === 3;
  }

  // static checkAny(grid) {
  //   for(let)
  // }
  static checkHorizontal(grid) {
    for (let i = 0; i < grid.length; i++) {
      let currentRow = grid[i];

      if (currentRow.every((cell) => cell === this.symbols.x)) {
        return "X";
      } else if (currentRow.every((cell) => cell === this.symbols.o)) {
        return "O";
      }
    }
  }

  static checkDiagonals(grid) {
    const firstRow = grid[0];
    const secondRow = grid[1];
    const thirdRow = grid[2];
    let diagonalMatch;
    for (let i = 0; i < firstRow.length; i++) {
      for (let j = firstRow.length - 1; j > firstRow.length - 2; j--) {
        let [cell1, cell2, cell3] = [
          firstRow[j],
          secondRow[j - 1],
          thirdRow[j - 2],
        ];
        diagonalMatch = this._checkCols(cell1, cell2, cell3);
        if (diagonalMatch) {
          return diagonalMatch;
        }
      }

      for (let h = 0; h < 1; h++) {
        let [cell1, cell2, cell3] = [
          firstRow[h],
          secondRow[h + 1],
          thirdRow[h + 2],
        ];
        diagonalMatch = this._checkCols(cell1, cell2, cell3);
        if (diagonalMatch) {
          return diagonalMatch;
        }
      }
    }
  }

  static _checkCols(cell1, cell2, cell3) {
    if (
      cell1 === this.symbols.x &&
      cell2 === this.symbols.x &&
      cell3 === this.symbols.x
    ) {
      return this.symbols.x;
    } else if (
      cell1 === this.symbols.o &&
      cell2 === this.symbols.o &&
      cell3 === this.symbols.o
    ) {
      return this.symbols.o;
    }
  }
  static checkVertical(grid) {
    const firstRow = grid[0];
    const secondRow = grid[1];
    const thirdRow = grid[2];
    let verticalMatch;
    for (let i = 0; i < firstRow.length; i++) {
      let [cell1, cell2, cell3] = [firstRow[i], secondRow[i], thirdRow[i]];
      verticalMatch = this._checkCols(cell1, cell2, cell3);
      if (this._checkCols(cell1, cell2, cell3)) {
        verticalMatch = this._checkCols(cell1, cell2, cell3);

        return verticalMatch;
      }
    }
  }

  static checkFilled(grid) {
    const filled = grid.reduce(
      (acc, arr) =>
        acc +
        arr.reduce(
          (acc, currentEl) =>
            currentEl === this.symbols.x || currentEl === this.symbols.o
              ? acc + 1
              : acc + 0,
          0
        ),
      0
    );
    return filled;
  }

  static horizontalWin(grid) {
    if (this.checkHorizontal(grid) === this.symbols.o) {
      return this.symbols.o;
    } else if (this.checkHorizontal(grid) === this.symbols.x) {
      return this.symbols.x;
    }
  }

  static checkWin(grid) {
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended
    if (this.checkFilled(grid) === 9) {
      return this.symbols.t;
    } else if (this.checkEmpty(grid) || this.checkFilled(grid) >= 7) {
      return false;
    } else {
      return (
        this.horizontalWin(grid) ||
        this.checkVertical(grid) ||
        this.checkDiagonals(grid)
      );
    }
  }

  static endGame(winner) {
    if (winner === "O" || winner === "X") {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === "T") {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }
}
const grid = [
  ["X", "O", "X"],
  ["X", "O", "O"],
  ["O", "X", "O"],
];

console.log(TTT.checkWin(grid));
module.exports = TTT;
