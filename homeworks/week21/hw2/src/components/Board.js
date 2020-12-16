import styled from "styled-components";
import PropTypes from "prop-types";

const BoardWrapper = styled.span`
  margin: 0 auto;
  margin-top: 32px;
  display: flex;
  justify-content: center;
  background: #e6b77e;
  width: 83vmin;
  box-shadow: 4px 4px 3px rgba(20%, 20%, 40%, 0.5);
  padding: 3vmin;
`;

const Cell = styled.div`
  height: 3vmin;
  width: 3vmin;
  border: 1px solid gray;
  padding: 0.5vmin;
  position: relative;

  &:hover {
    background: ${(props) => (props.player ? "" : "#f3cd9f")};
  }
`;

const Piece = styled.div`
  border-radius: 50%;
  background: ${(props) => props.player};
  height: 100%;
  width: 100%;
  box-shadow: 2px 0px 1px rgba(20%, 20%, 40%, 1);
`;

const rows = Array.from({ length: 19 });
const columns = Array.from({ length: 19 });

export default function Board({ board, handleClickCell }) {
  return (
    <BoardWrapper>
      {rows.map((_, y) => (
        <div key={y}>
          {columns.map((_, x) => (
            <Cell
              key={[x, y]}
              onClick={(e) => handleClickCell(x, y)}
              player={board[x][y]}
            >
              {!board[x][y] || <Piece player={board[x][y]} />}
            </Cell>
          ))}
        </div>
      ))}
    </BoardWrapper>
  );
}

Board.propTypes = {
  board: PropTypes.array,
  handleClickCell: PropTypes.func,
};
