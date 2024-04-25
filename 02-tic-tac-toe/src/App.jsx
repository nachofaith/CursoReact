import { useState } from "react";
import confetti from "canvas-confetti";
import "./index.css";
import { Square } from "./components/Square";
import { TURNS } from "./constants";
import { WINNER_COMBOS } from "./constants";
import { WinnerModal } from "./components/WinnerModal";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(TURNS.A);
  const [winner, setWinner] = useState(null);

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      console.log(combo);
      const [a, b, c] = combo;
      if (
        boardToCheck[a] === boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return board[a];
      }
    }
    return null;
  };

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null);
  };

  const updateBoard = (index) => {
    //VALIDAR SI HAY VALORES EN LOS CUADRADOS

    if (board[index] || winner) {
      return;
    } else {
      const newBoard = [...board];

      newBoard[index] = turn;
      console.log(newBoard);

      setBoard(newBoard);

      const newTurn = turn === TURNS.A ? TURNS.B : TURNS.A;
      setTurn(newTurn);

      window.localStorage.setItem("board", JSON.stringify(newBoard));
      window.localStorage.setItem("turn", turn);

      const newWinner = checkWinner(newBoard);

      if (newWinner) {
        confetti();
        setWinner(newWinner);
      } else if (checkEndGame(newBoard)) {
        setWinner(false);
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.A);
    setWinner(null);
  };

  return (
    <main className="board">
      <h1>Gato</h1>
      <button onClick={resetGame}>Reiniciar</button>
      <section className="game">
        {board.map((__, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        {/* Envio true o false a funcion Square para ver que turno es */}
        <Square isSelected={turn === TURNS.A}>{TURNS.A}</Square>
        <Square isSelected={turn === TURNS.B}>{TURNS.B}</Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;
