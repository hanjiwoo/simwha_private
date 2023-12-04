import AddForm from "components/AddForm";
import Header from "components/Header";
import Layout from "components/Layout";
import LetterList from "components/LetterList";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

export default function Home() {
  const loginedUser = useSelector((state) => state.authSlice);
  return (
    <Container>
      {loginedUser.isLoggedIn ? <Outlet /> : null}
      <Header />
      <AddForm />
      <LetterList />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
