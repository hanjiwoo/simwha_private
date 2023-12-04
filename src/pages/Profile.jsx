import axios from "axios";
import Layout from "components/Layout";
import Button from "components/common/Button";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
export default function Profile() {
  const [image, setImage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState("");
  const navigate = useNavigate();
  const logInedUser = useSelector((state) => state.authSlice);
  const { id } = useParams();
  useEffect(() => {
    setImage(logInedUser.avatar);
  }, []);

  const fileInputRef = useRef(null);

  const changeImg = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    console.log("선택된 파일:", selectedFile);
  };
  const { avatar, accessToken, userId, isLoggedIn } = logInedUser.find(
    (user) => user.id === id
  );

  const onEditDone = async () => {
    if (!editingText) return alert("수정사항이 없습니다.");

    await profileChange();
    setIsEditing(false);
    setEditingText("");
    alert("수정완료");
    navigate("/");
  };
  const profileChange = async () => {
    const formData = new FormData();

    formData.append("avatar", image);
    formData.append("nickname", editingText);
    axios.patch(`https://moneyfulpublicpolicy.co.kr/profile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };
  return (
    <>
      <Layout />
      <Body>
        <ProfileWrapper>
          <h1>프로필 관리</h1>
          <Avatar>
            <img
              onClick={changeImg}
              style={{ cursor: "pointer" }}
              src={image}
              alt="노이미지"
            ></img>
          </Avatar>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          <h3>{logInedUser.userId}</h3>

          {isEditing ? (
            <>
              <Textarea
                autoFocus
                defaultValue={logInedUser.nickname}
                onChange={(event) => setEditingText(event.target.value)}
              />
              <BtnsWrapper>
                <Button text="취소" onClick={() => setIsEditing(false)} />
                <Button text="수정완료" onClick={onEditDone} />
              </BtnsWrapper>
            </>
          ) : (
            <>
              <Content>{logInedUser.nickname}</Content>
              <BtnsWrapper>
                {logInedUser.userId === id ? (
                  <>
                    <Button text="수정" onClick={() => setIsEditing(true)} />
                  </>
                ) : null}{" "}
              </BtnsWrapper>
            </>
          )}
        </ProfileWrapper>
      </Body>
    </>
  );
}

const Body = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;
const ProfileWrapper = styled.div`
  width: 50vw;
  height: 50vh;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: gray;
`;
const Avatar = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
  }
`;
const BtnsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const Textarea = styled.textarea`
  font-size: 24px;
  line-height: 30px;
  padding: 12px;
  background-color: black;
  border-radius: 12px;
  height: 200px;
  resize: none;
  color: white;
`;
const Content = styled.p`
  font-size: 24px;
  line-height: 30px;
  padding: 12px;
  background-color: black;
  border-radius: 12px;
  height: 200px;
`;
