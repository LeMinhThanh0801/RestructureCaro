const Square = ({highlight, onClick, value}) => (
    <button
      className={"square" + (highlight ? " highlight" : "")}
      onClick={() => onClick()}
    >
      {value}
    </button>
  );

export default Square;