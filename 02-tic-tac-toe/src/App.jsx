import { useState } from "react";
import "./index.css";

const TURNS = {
  X: "x",
  O: "o",
};

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleCLick = () => {
    updateBoard();
  };
  return (
    <div onClick={handleCLick} className={className}>
      {children}
    </div>
  );
};

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const updateBoard = () => {
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
  };

  return (
    <main className="board">
      <h1>Gato</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >{board[index]}</Square>
          );
        })}
      </section>
      <section className="turn">
        {/* Envio true o false a funcion Square para ver que turno es */}
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
    </main>
  );
}

export default App;
