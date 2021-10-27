import Square from '../Square/Square';

const Board = ({winLine, squares, onClick}) => {
    const renderSquare = (i) => {
      // const winLine = winLine;
      return (
        <Square
          key={i}
          value={squares[i]}
          onClick={() => onClick(i)}
          highlight={winLine && winLine.includes(i)}
        />
      );
    }
  
    const createTheBoard = () => {
      let squares = [];
      for (let i = 0; i < 9; ++i) {
        let row = [];
        for (let j = 0; j < 9; ++j) {
          row.push(renderSquare(i * 9 + j));
        }
        squares.push(
          <div key={i} className="board-row">
            {row}
          </div>
        );
      }
      return squares;
    }
      
    return <div>{createTheBoard()}</div>;
}
export default Board