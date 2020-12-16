import styled from "styled-components";
import Form from "./components/Form";
import "./App.css";
import useForm from "./hooks/useForm";

const Wrapper = styled.div`
  margin: 0 auto;
`;

const Main = styled.div`
  max-width: 645px;
  border-top: solid #fad312 8px;
  background: white;
  margin: 10% auto;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
  padding: 54px 42px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 35px;
  margin-top: 0;
  font-weight: bold;
`;

const Info = styled.div`
  font-size: 14px;
  line-height: 2em;
`;

const Notice = styled.div`
  color: #e74149;
  font-size: 16px;
  margin-top: 22px;
`;

const Footer = styled.div`
  background: black;
  color: #999999;
  font-size: 13px;
  padding: 25px;
  text-align: center;
`;

function App() {
  const {
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
  } = useForm();

  return (
    <>
      <Wrapper>
        <Main>
          <Title>新拖延運動報名表單</Title>
          <Info>
            活動日期：2020/12/10 ~ 2020/12/11
            <br />
            活動地點：台北市大安區新生南路二段1號
          </Info>
          <Notice>* 必填</Notice>
          <Form
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            type={type}
            setType={setType}
            how={how}
            setHow={setHow}
            other={other}
            setOther={setOther}
            handleInputChange={handleInputChange}
            checkMode={checkMode}
            handleSubmit={handleSubmit}
            isValidEmail={isValidEmail}
            isValidPhone={isValidPhone}
          />
        </Main>
      </Wrapper>
      <Footer>© 2020 © Copyright. All rights Reserved.</Footer>
    </>
  );
}

export default App;
