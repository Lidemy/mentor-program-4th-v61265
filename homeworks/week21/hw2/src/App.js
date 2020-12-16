import Board from "./components/Board";
import Information from "./components/Information";
import useBoard from "./hooks/useBoard";
import styled from "styled-components";

const Status = styled.h1`
  text-align: center;
`;

function App() {
  const {
    board,
    handleClickCell,
    round,
    handleReset,
    winner,
    handleSave,
    handleCopy,
    recordInput,
    handleChangeRecord,
    hanleReproduceRecord,
  } = useBoard();

  return (
    <>
      <Status>{winner ? `${winner} win` : `${round} turn`}</Status>
      <Board board={board} handleClickCell={handleClickCell} winner={winner} />
      <Information
        round={round}
        handleReset={handleReset}
        winner={winner}
        handleSave={handleSave}
        handleCopy={handleCopy}
        board={board}
        recordInput={recordInput}
        handleChangeRecord={handleChangeRecord}
        hanleReproduceRecord={hanleReproduceRecord}
      />
    </>
  );
}

export default App;
