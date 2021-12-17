import React from "react";
import styled, { keyframes, css } from "styled-components";

import modalicon from "../../../assets/images/icon/modalicon.png";
export default function Modal({ handleModal, handleModalFunc, type }) {
  const sentence = {
    del: ["정말로 삭제하시겠습니까?", "다시 복구가 불가능합니다"],
    login: [
      "로그인 하시겠습니까?",
      "로그인하시면 더많은 혜택과 활동을 하실 수가 있습니다",
    ],
    resign: [
      "정말 회원탈퇴 하시겠습니까?",
      "현재 가지고 있는 모든 포인트와 회원정보가 없어집니다",
    ],
    email: [
      "이메일 인증이 필요합니다!",
      "회원가입시 작성한 이메일을 확인하신 후 인증해주세요.",
    ],
  };
  return (
    <Container onClick={handleModal}>
      <Alarm onClick={(e) => e.stopPropagation()} type={type}>
        <h1>KICK</h1>
        <div className="headline">
          <img src={modalicon} alt="" />
          <h2>{sentence[type][0]}</h2>
        </div>
        <p>{sentence[type][1]}</p>

        <ButtonContainer type={type}>
          {type === "resign" && (
            <>
              <button onClick={handleModalFunc}>Yes</button>
              <button onClick={handleModal}>No</button>
            </>
          )}
          {(type === "login" || type === "del") && (
            <>
              <button onClick={handleModal}>No</button>
              <button onClick={handleModalFunc}>Yes</button>
            </>
          )}
          {type === "email" && <button onClick={handleModal}>확인</button>}
        </ButtonContainer>
      </Alarm>
    </Container>
  );
}
const shake = keyframes`
  
  40% { margin-top: -5px; }
  60% { margin-top: 0; margin-bottom: -5px; }
  80% { margin-bottom: 0; margin-top: -5px; }
  100% { margin: 0; } 
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
`;
const Alarm = styled.div`
  position: absolute;
  top: 65%;
  left: 50%;
  display: flex;
  flex-direction: column;

  width: 30rem;
  height: 16rem;
  gap: 1rem;
  font-size: 1.6rem;
  transform: translate(-50%, -150%);
  padding: 1.5rem 2rem;
  color: ${({ theme }) => theme.color.modalColor};
  background-color: ${({ theme }) => theme.color.back};
  border: 3px solid ${({ theme }) => theme.color.mypageSvg};
  border-radius: 0.5rem;
  animation: 0.25s linear ${shake};

  h1 {
    font-family: "Luckiest Guy", cursive;
  }
  .headline {
    display: flex;
    align-items: center;
    img {
      width: 2.5rem;
      height: 2.5rem;
      margin-right: 0.5rem;
    }
  }
  p {
    font-size: 1rem;
    margin-left: 3rem;
    font-weight: 550;
    ${({ type }) =>
      type === "resign" &&
      css`
        color: red;
      `}
    ${({ type }) =>
      (type === "login" || type === "email") &&
      css`
        color: ${({ theme }) => theme.color.loginDesc};
      `}

    ${({ type }) =>
      type === "del" &&
      css`
        color: red;
      `}
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  button {
    width: 6rem;
    height: 2.5rem;
    border: 2px solid #eee;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.color.modalBtn};
    background-color: ${({ theme }) => theme.color.tabBack};
    :hover {
      transform: scale(1.05);
    }
    :nth-of-type(2) {
      background-color: #0c0c42;
      color: white;
      ${({ type }) =>
        type === "resign" &&
        css`
          background-color: red;
        `}
    }
  }
`;
