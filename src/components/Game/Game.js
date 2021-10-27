import React, {useState} from 'react';
import Board from '../Board/Board';

const Game = (props) => {
    const [history, setHistory] = useState([
        {
          squares: Array(81).fill(null),
        },
      ]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const [isAscending, setIsAscending] = useState(true);
    const [boardSize, setBoardSize] = useState(9);
  
    const handleClick = (i) => {
      const newHistory = history.slice(0, stepNumber + 1);
      const current = newHistory[newHistory.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares, boardSize).winner || squares[i]) {
        return;
      }
      squares[i] = xIsNext ? "X" : "O";
      setHistory(history.concat([
        {
          squares: squares,
          latestMoveSquare: i,
        },
      ]));
      setStepNumber(history.length);
      setXIsNext(!xIsNext);
    }
  
    const jumpTo = (step) => {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
    }
  
    const handleSortToggle = () => {
        setIsAscending(!isAscending);
    }
  
      const current = history[stepNumber];
      const checkResult = calculateWinner(current.squares, boardSize);
      const moves = history.map((step, move) => {
        const latestMoveSquare = step.latestMoveSquare;
        const col = (latestMoveSquare % 5) + 1;
        const row = Math.floor(latestMoveSquare / 5) + 1;
        const desc = move
          ? `Go to move #${move} (${col}, ${row})`
          : "Go to game start";
        return (
          <li key={move}>
            {}
            <button
              className={move === stepNumber ? "move-list-item-selected" : ""}
              onClick={() => jumpTo(move)}
            >
              {desc}
            </button>
          </li>
        );
      });
  
      let status;
      if (checkResult.winner) {
        status = " The Winner: " + checkResult.winner;
      } else {
        if (checkResult.isDraw) {
          status = " The Game Draw";
        } else {
          status = "Next player: " + (xIsNext ? "X" : "O");
        }
      }

      if (!isAscending) {
        moves.reverse();
      }
  
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => handleClick(i)}
              winLine={checkResult.line}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <button onClick={() => handleSortToggle()}>
              {isAscending ? "Descending" : "Ascending"}
            </button>
            <ol>{moves}</ol>
          </div>
        </div>
      );
  }
  
  const calculateWinner = (squares, boardSize) => {
    let lines = [];
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (boardSize - j >= 5) {
          lines.push([
            boardSize * i + j,
            boardSize * i + j + 1,
            boardSize * i + j + 2,
            boardSize * i + j + 3,
            boardSize * i + j + 4,
          ]);
          lines.push([
            i + boardSize * j,
            i + boardSize * (j + 1),
            i + boardSize * (j + 2),
            i + boardSize * (j + 3),
            i + boardSize * (j + 4),
          ]);
          if (boardSize - i >= 5) {
            lines.push([
              i * boardSize + j,
              (i + 1) * boardSize + j + 1,
              (i + 2) * boardSize + j + 2,
              (i + 3) * boardSize + j + 3,
              (i + 4) * boardSize + j + 4,
            ]);
            lines.push([
              i * boardSize + (4 + j),
              (i + 1) * boardSize + (3 + j),
              (i + 2) * boardSize + (2 + j),
              (i + 3) * boardSize + (1 + j),
              (i + 4) * boardSize + j,
            ]);
          }
        }
      }
    }
  
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c, d, e] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c] &&
        squares[a] === squares[d] &&
        squares[a] === squares[e]
      ) {
        return {
          winner: squares[a],
          line: lines[i],
          isDraw: false,
        };
      }
    }
  
    let isDraw = true;
    if (squares.includes(null)) {
      isDraw = false;
    }
    return {
      winner: null,
      line: null,
      isDraw: isDraw,
    };
  };

export default Game