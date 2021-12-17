import React from "react";
import styled, { css, keyframes } from "styled-components";

export default function Common({ label, type, handleClick, disabled }) {
  const btnType = type;
  return (
    <Container
      type="button"
      onClick={handleClick}
      btnType={btnType}
      disabled={disabled}
    >
      {label}
    </Container>
  );
}
const shake = keyframes`
  0% {  transform: scale(0.98); }
  20% {  transform: scale(1); }
  40% { margin-left: -10px; }
  60% { margin-left: 0; margin-right: -10px; }
  80% { margin-right: 0; margin-left: -10px; }
  100% { margin: 0; } 
`;

const Container = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 2.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.color.basicBtn};

  font-weight: bold;
  color: #ffffff;
  cursor: pointer;

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: default;
      background-color: gray;
    `}

  ${({ btnType }) =>
    btnType === "imgedit" &&
    css`
      width: 6rem;
      background-color: white;
      color: black;
      border: 1px solid #ddd;
      box-shadow: 1px 1px 5px #eee;
      &:hover {
        background-color: #ddd;
      }
    `}

  ${({ btnType }) =>
    btnType === "register" &&
    css`
      margin-left: auto;
      width: 5rem;
      height: 2rem;
      border-radius: 0;
      &:hover {
        background-color: ${({ theme }) => theme.color.hoverBasicBtn};
      }
    `}

    ${({ btnType, disabled }) =>
    btnType === "mypage" &&
    !disabled &&
    css`
      cursor: pointer;
      background-color: #0c0c42;
      &:hover {
        opacity: 0.8;
        transition: all 0.15s linear;
      }
    `}

    ${({ btnType }) =>
    btnType === "new" &&
    css`
      width: 10rem;
      border: 1px solid #d8d8d8;

      &:hover {
        background-color: ${({ theme }) => theme.color.hoverBasicBtn};
      }
    `}

  ${({ btnType }) =>
    btnType === "bigger" &&
    css`
      width: 10rem;

      &:hover {
        background-color: ${({ theme }) => theme.color.hoverBasicBtn};
      }
    `}

    ${({ btnType }) =>
    btnType === "confirm" &&
    css`
      background-color: ${({ theme }) => theme.color.confirmBtn};
    `}

    ${({ btnType }) =>
    btnType === "error" &&
    css`
      background-color: ${({ theme }) => theme.color.confirmBtnError};
      animation: 0.3s linear ${shake};
    `}

    ${({ btnType }) =>
    btnType === "resign" &&
    css`
      background-color: red;
      width: 30%;
    `}
`;
