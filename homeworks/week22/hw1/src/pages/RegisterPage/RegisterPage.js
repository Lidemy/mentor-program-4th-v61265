import { setAuthToken } from "../../utils";
import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { register, getMe } from "../../WebAPI";
import { AuthContext } from "../../contexts";
import Loading from "../../components/Loading";
import { LoadingContext } from "../../contexts";

const Input = styled.input`
  color: #373f27;
  margin-bottom: 5px;
  padding: 5px;
  border: 1px solid #cda34f;
  border-radius: 3px;

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  padding: 5px 10px;
  background: #e9e7da;
  color: #636b46;
  border: 1px solid #636b46;
  border-radius: 3px;
  margin-top: 10px;

  &:hover {
    color: #373f27;
    cursor: pointer;
  }
`;

const Title = styled.h1`
  margin-top: 0px;
`;

const ErrMessage = styled.div`
  color: red;
`;

export default function HomePage() {
  const { setUser } = useContext(AuthContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [errMessage, setErrMessage] = useState();
  const history = useHistory();

  // 註冊成功 → 寫入 token + 導向首頁
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    setErrMessage("");
    register(username, password, nickname).then((res) => {
      if (res.ok !== 1) {
        setIsLoading(false);
        return setErrMessage(res.message);
      }
      setAuthToken(res.token);
      getMe().then((response) => {
        if (response.ok !== 1) {
          setAuthToken(null);
          setIsLoading(false);
          return setErrMessage(response.message);
        }
        setUser(response.data);
        setIsLoading(false);
        history.push("/");
      });
    });
  };

  // 防止這頁還沒跑完其他頁也不能跑
  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <Title>會員註冊</Title>
      <form onSubmit={handleSubmit}>
        <div>
          帳號：
          <br />
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          密碼：
          <br />
          <Input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          暱稱：
          <br />
          <Input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        {errMessage && <ErrMessage>{errMessage}</ErrMessage>}
        <Button>送出</Button>
      </form>
    </>
  );
}
