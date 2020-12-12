import styled from "styled-components";
import PropTypes from "prop-types";

const InformationWrapper = styled.div`
  margin: 0 auto;
  margin-top: 20px;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  margin-top: 5px;
`;

const Button = styled.button`
  padding: 8px;
  background: white;
  border: 1px solid grey;
  color: grey;
  border-radius: 5px;
  font-size: 14px;
  box-shadow: 0px 0 0 black;

  &:hover {
    cursor: pointer;
    color: white;
    background: grey;
  }

  & + & {
    margin-left: 5px;
  }
`;

const Input = styled.input`
  padding: 5px;
  margin-right: 3px;
`;

const Hidden = styled.input`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 2em;
  height: 2em;
  padding: 0;
  box-shadow: none;
  opacity: 0;
`;

export default function Information({
  round,
  handleReset,
  handleSave,
  handleCopy,
  board,
  recordInput,
  handleChangeRecord,
  hanleReproduceRecord,
}) {
  return (
    <InformationWrapper>
      <ButtonWrapper>
        <Button onClick={() => handleReset()}>重來一次</Button>
        <Button onClick={() => handleSave()}>儲存棋局</Button>
        <Button onClick={() => handleCopy()}>
          <Hidden
            className='recordData'
            value={JSON.stringify([JSON.stringify(board), round])}
          />
          複製棋局
        </Button>
      </ButtonWrapper>
      <ButtonWrapper>
        <Input
          className='record'
          type='text'
          value={recordInput}
          onChange={handleChangeRecord}
        />
        <Button onClick={hanleReproduceRecord}>送出已儲存棋局</Button>
      </ButtonWrapper>
    </InformationWrapper>
  );
}

Information.propTypes = {
  round: PropTypes.string,
  handleReset: PropTypes.func,
  handleSave: PropTypes.func,
  handleCopy: PropTypes.func,
  board: PropTypes.array,
  recordInput: PropTypes.string,
  handleChangeRecord: PropTypes.func,
  hanleReproduceRecord: PropTypes.func,
};
