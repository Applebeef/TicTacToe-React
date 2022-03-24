import "./App.css";
import Grid from "./components/Grid";
import { useState, useEffect } from "react";

function App() {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [grid, setGrid] = useState([
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ]);
  const [winner, setWinner] = useState("");
  const [ai, setAi] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const switchPlayer = () => {
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const checkWin = (rowIndex, colIndex, player = currentPlayer) => {
    const rowWin = grid[rowIndex].every((cell) => cell === player);
    const colWin = grid.every((row) => row[colIndex] === player);
    const diagWin =
      (grid[0][0] === player &&
        grid[1][1] === player &&
        grid[2][2] === player) ||
      (grid[0][2] === player && grid[1][1] === player && grid[2][0] === player);

    return rowWin || colWin || diagWin;
  };

  const checkDraw = () => {
    return grid.every((row) => row.every((cell) => cell !== " "));
  };

  const changeCell = (row, col) => {
    if (grid[row][col] !== " " || winner !== "") return;
    if (!gameStarted) setGameStarted(true);
    const newGrid = [...grid];
    newGrid[row][col] = currentPlayer;
    setGrid(newGrid);

    if (checkWin(row, col)) {
      setWinner(currentPlayer);
    } else if (checkDraw()) {
      setWinner("draw");
    } else {
      switchPlayer();
    }
  };

  const reset = () => {
    setGrid([
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ]);
    setWinner("");
    setCurrentPlayer("X");
    setGameStarted(false);
  };

  var message = "";
  if (winner === "") {
    message = "Current player: " + currentPlayer;
  } else if (winner === "draw") {
    message = "It's a draw!";
  } else {
    message = "The winner is: " + winner;
  }

  useEffect(() => {
    const checkWinTemp = (cell, player = currentPlayer) => {
      grid[cell[0]][cell[1]] = player;
      let win = checkWin(cell[0], cell[1], player);
      grid[cell[0]][cell[1]] = " ";
      return win;
    };

    const aiMove = () => {
      const possibleMoves = grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (cell === " ") return [rowIndex, colIndex];
          return null;
        })
      );
      const emptyCells = possibleMoves.flat().filter((cell) => cell !== null);
      let res = emptyCells.find((cell) => {
        return checkWinTemp(cell);
      });
      if (res === undefined) {
        res = emptyCells.find((cell) => {
          return checkWinTemp(cell, "X");
        });
      }
      if (res === undefined) {
        res = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      }
      return res;
    };

    if (ai && currentPlayer === "O") {
      setTimeout(() => {
        const [aiRow, aiCol] = aiMove();
        changeCell(aiRow, aiCol);
      }, 500);
    }
  }, [currentPlayer]);

  return (
    <div className="App">
      <h1>TicTacToe</h1>
      <input
        type="checkbox"
        id="ai"
        disabled={gameStarted}
        checked={ai}
        onClick={() => setAi(!ai)}
      />
      <label htmlFor="ai">Enable AI</label>
      <h2>{message}</h2>
      <Grid
        grid={grid}
        aiTurn={currentPlayer === "O" && ai}
        changeCellFunction={changeCell}
      />
      <button onClick={reset}>Reset Board</button>
    </div>
  );
}

export default App;
