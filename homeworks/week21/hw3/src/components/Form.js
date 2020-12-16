import styled from "styled-components";
import PropTypes from "prop-types";

const FromWrapper = styled.form``;

const QuestWrapper = styled.div`
  margin-top: 55px;

  & + & {
    margin-top: 49px;
  }

  & .required::after {
    content: "*";
    color: #e74149;
  }
`;

const Input = styled.input`
  border: solid 1px #d0d0d0;
  padding: 5px;
`;

const QuestDest = styled.div`
  font-size: 20px;
  margin: 0;
  margin-bottom: 20px;
`;

const Ps = styled.div`
  font-size: 14px;
  margin-top: 12px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 14px;
  display: block;
  & + & {
    margin-top: 20px;
  }
`;

const SubmitWrapper = styled.div`
  & div {
    font-size: 14px;
    margin-top: 21px;
  }

  & input {
    font-size: 15px;
    padding: 13px 30px;
    border-radius: 3px;
    border: none;
    background: #fad312;
    margin-top: 55px;

    &:hover {
      content: "";
      transition: 0.2s;
      background: white;
      border: solid #fad312 2px;
      cursor: pointer;
    }
  }
`;

const Remain = styled.div`
  margin-top: 4px;
  color: red;
  font-size: 12px;
`;

export default function Form({
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  type,
  setType,
  how,
  setHow,
  other,
  setOther,
  handleInputChange,
  checkMode,
  handleSubmit,
  isValidEmail,
  isValidPhone,
}) {
  return (
    <FromWrapper>
      <QuestWrapper>
        <QuestDest className='required'>暱稱</QuestDest>
        <Input
          type='text'
          onChange={(e) => handleInputChange(setName, e)}
          value={name}
        />
        {!(checkMode && !name) || <Remain>請輸入暱稱</Remain>}
      </QuestWrapper>
      <QuestWrapper>
        <QuestDest className='required'>電子信箱</QuestDest>
        <Input
          type='email'
          onChange={(e) => handleInputChange(setEmail, e)}
          value={email}
        />
        {!(checkMode && !email) || <Remain>請輸入電子信箱</Remain>}
        {!(checkMode && !isValidEmail) || <Remain>格式不正確ㄛ</Remain>}
      </QuestWrapper>
      <QuestWrapper>
        <QuestDest className='required'>手機號碼</QuestDest>
        <Input
          type='text'
          onChange={(e) => handleInputChange(setPhone, e)}
          value={phone}
        />
        {!(checkMode && !phone) || <Remain>請輸入手機號碼</Remain>}
        {!(checkMode && !isValidPhone) || <Remain>格式不正確ㄛ</Remain>}
      </QuestWrapper>
      <QuestWrapper>
        <QuestDest className='required'>報名類型</QuestDest>
        <Label>
          <Input
            type='radio'
            name='type'
            value='imaging'
            onChange={(e) => handleInputChange(setType, e)}
          />
          躺在床上用想像力實作
        </Label>
        <Label>
          <Input
            type='radio'
            name='type'
            value='phone'
            onChange={(e) => handleInputChange(setType, e)}
          />{" "}
          趴在地上滑手機找現成的
        </Label>
        {!(checkMode && !type) || <Remain>請勾選報名類型</Remain>}
      </QuestWrapper>
      <QuestWrapper>
        <QuestDest className='required'>怎麼知道這個活動ㄉ？</QuestDest>
        <Input
          type='text'
          onChange={(e) => handleInputChange(setHow, e)}
          value={how}
        />
        {!(checkMode && !how) || <Remain>請勾填寫資料來源</Remain>}
      </QuestWrapper>
      <QuestWrapper>
        <QuestDest>其他</QuestDest>
        <Ps>對活動的一些建議</Ps>
        <Input
          type='text'
          onChange={(e) => handleInputChange(setOther, e)}
          value={other}
        />
      </QuestWrapper>
      <SubmitWrapper>
        <Input type='submit' value='提交' onClick={(e) => handleSubmit(e)} />
        <div>請勿透過表單送出您的密碼。</div>
      </SubmitWrapper>
    </FromWrapper>
  );
}

Form.propTypes = {
  name: PropTypes.string,
  setName: PropTypes.func,
  email: PropTypes.string,
  setEmail: PropTypes.func,
  phone: PropTypes.string,
  setPhone: PropTypes.func,
  type: PropTypes.string,
  setType: PropTypes.func,
  how: PropTypes.string,
  setHow: PropTypes.func,
  other: PropTypes.string,
  setOther: PropTypes.func,
  handleInputChange: PropTypes.func,
  checkMode: PropTypes.bool,
  handleSubmit: PropTypes.func,
  isValidEmail: PropTypes.bool,
  isValidPhone: PropTypes.bool,
};
