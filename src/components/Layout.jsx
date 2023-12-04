import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logout } from "redux/modules/authSlice";
export default function Layout() {
  const dispatch = useDispatch();

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
  const navigate = useNavigate();
  const loginedUser = useSelector((state) => state.authSlice);
  return (
    <>
      <Nav>
        <p
          onClick={() => {
            navigate("/");
          }}
        >
          HOME
        </p>
        {loginedUser.isLoggedIn ? (
          <p>
            <p onClick={() => navigate(`/profile/${loginedUser.userId}`)}>
              내프로필
            </p>
            <p
              onClick={() => {
                handleLogout();
              }}
            >
              로그아웃
            </p>
          </p>
        ) : (
          <p>
            <p
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인
            </p>
          </p>
        )}
      </Nav>
    </>
  );
}

const Nav = styled.nav`
  width: 100%;
  background-color: gray;
  color: black;
  display: flex;
  justify-content: space-between;
`;
