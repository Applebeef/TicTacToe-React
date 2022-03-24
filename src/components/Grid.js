import "./Grid.css";

const Cell = ({ rowNum, colNum, data, aiTurn, changeCellFunction }) => {
  const handleClick = () => {
    if (aiTurn) return;
    changeCellFunction(rowNum, colNum);
  };

  return <td onClick={handleClick}>{data}</td>;
};

const Row = ({ rowNum, data, aiTurn, changeCellFunction }) => {
  var cells = [];
  for (let i = 0; i < 3; i++) {
    cells[i] = (
      <Cell
        rowNum={rowNum}
        colNum={i}
        data={data[i]}
        aiTurn={aiTurn}
        changeCellFunction={changeCellFunction}
      ></Cell>
    );
  }
  return <tr>{cells}</tr>;
};

const Grid = ({ grid, aiTurn, changeCellFunction }) => {
  var rows = [];
  for (let i = 0; i < 3; i++) {
    rows[i] = (
      <Row
        key={i}
        rowNum={i}
        data={grid[i]}
        aiTurn={aiTurn}
        changeCellFunction={changeCellFunction}
      />
    );
  }

  return (
    <table className="Grid">
      <tbody>{rows}</tbody>
    </table>
  );
};

export default Grid;
