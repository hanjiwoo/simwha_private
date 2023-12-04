import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectIsLoggedIn } from "redux/modules/authSlice";

import styled from "styled-components";

export default function Login() {
  const [toggle, settoggle] = useState(true);
  const [id, setId] = useState("");
  const [pswd, setPswd] = useState("");
  const [nickName, setNickname] = useState("");
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  //const activeMember = useSelector((state) => state.isLoggedIn);
  //const [user, setUser] = useState(null);
  const fetchUser = async () => {
    const response = await axios.get("https://moneyfulpublicpolicy.co.kr/");
    //setUser();
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const register = async () => {
    const newUser = {
      id: id,
      password: pswd,
      nickname: nickName,
    };
    try {
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/register",
        newUser
      );
      alert("회원가입 성공", response);
    } catch (error) {
      alert("회원가입 실패", error);
    }
  };
  const handleLogin = async () => {
    try {
      const loginUser = {
        id: id,
        password: pswd,
      };

      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/login",
        loginUser
      );
      alert("로그인 성공", response);

      const loginedUser = {
        nickname: response.nickname,
        accessToken: response.accessToken,
        userId: response.userId,
        success: true,
        avatar: response.avatar,
      };
      dispatch(login(loginedUser));

      localStorage.setItem("loginUser", JSON.stringify(loginedUser));
    } catch (error) {
      alert("로그인 실패", error);
    }
  };
  const userHwackIn = async () => {
    try {
      const response = await axios.get(
        `https://moneyfulpublicpolicy.co.kr/user`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      alert("회원확인 성공", response);
    } catch (error) {
      alert("회원확인 실패", error);
    }
  };

  const handleLogout = () => {
    dispatch(
      logout({
        nickname: null,
        accessToken: null,
        userId: null,
        success: false,
        avatar: null,
      })
    );
    localStorage.removeItem("loginUser");
  };
  const isLoginButtonDisabled = id.length < 4 || pswd.length < 4;

  return (
    <LoginWrapper>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h1>{toggle ? 회원가입 : 로그인}</h1>

        <input
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
          placeholder="아이디 (4~10글자)"
          maxLength={10}
        />
        <input
          value={pswd}
          onChange={(e) => {
            setPswd(e.target.value);
          }}
          placeholder="비밀번호 (4~15글자)"
          maxLength={15}
        />
        {toggle ? (
          <input
            value={nickName}
            onChange={(e) => {
              setNickname(e.target.value);
            }}
            placeholder="닉네임 (1~10글자)"
            maxLength={10}
          />
        ) : null}

        {toggle ? (
          <>
            <button
              disabled={isLoginButtonDisabled || !nickName}
              onClick={register}
            >
              회원가입
            </button>
            <Button
              onClick={() => {
                settoggle(!toggle);
              }}
            >
              로그인
            </Button>
          </>
        ) : (
          <>
            {" "}
            <button disabled={isLoginButtonDisabled} onClick={handleLogin}>
              로그인
            </button>
            <Button
              onClick={() => {
                settoggle(!toggle);
              }}
            >
              회원가입
            </Button>
          </>
        )}
      </Form>
    </LoginWrapper>
  );
}

const LoginWrapper = styled.section`
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const Form = styled.form`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  & input {
    width: 100%;
    border: none;
    border-bottom: 1px solid black;
    outline: none;
  }
  & button {
    width: 100%;
    background-color: gray;
    color: white;
    border: 1px solid black;
  }
`;

const Button = styled.button`
  border: none;
  background-color: white;
  color: gray;
`;
