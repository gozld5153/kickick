import React, { useState } from "react";
import styled from "styled-components";

import { validation } from "../../../commons/utils/validation";

export default function LoginInput({
  type = "text",
  part = "email",
  inputHandler,
  validHandler,
  coordinate,
  passwordInput,
  loginHandler,
  width = 20,
  height = 3,
}) {
  // 로그인, 회원가입에 쓰이는 인풋 박스 디자인
  const [isChange, setIsChange] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const isValidation = !validation(part,inputValue).isValid
  const contextHandler = (e) => {
    setIsChange(true);
    setInputValue(e.target.value);
    inputHandler(part, e.target.value);
  };

  const validContoller = () => {
    validHandler(part, isValidation);
  };

  const movePasswordInput = (e) => {
    if (e.key === "Enter" && type === "text") {
      passwordInput.current.focus();
    }
    if (e.key === "Enter" && type === "password") {
      loginHandler();
    }
  };

  return (
    <Container
      width={width}
      height={height}
      inputValue={inputValue}
      isChange={isChange}
      isValidation={!validation(part, inputValue).isValid}
    >
      <WarningBox
        height={height}
        inputValue={inputValue}
        isChange={isChange}
        isValidation={!validation(part, inputValue).isValid}
      >
        {!isChange && part === "username"
          ? "ID"
          : !isChange
          ? "PASSWORD"
          : validation(part, inputValue).message === "pass"
          ? "통과!"
          : validation(part, inputValue).message}
      </WarningBox>
      <Input
        type={type}
        height={height}
        value={inputValue}
        onChange={contextHandler}
        onKeyUp={validContoller}
        onKeyPress={movePasswordInput}
        ref={coordinate}
      />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: ${({ width }) => `${width}rem`};
  height: ${({ height }) => `${height}rem`};
  margin: 0.5rem 0;
  padding: ${({ height }) => `${height * 0.08}rem`};
  border: 0.1rem solid;
  border-color: ${({ isChange, isValidation, theme }) =>
    isChange === true && isValidation
      ? //한번이라도 입력했는데 벨리데이션을 통과 못함.
        "red"
      : isChange === true && !isValidation
      ? //한번이라도 입력한 후, 벨리데이션을 통과함.
        "blue"
      : "#222222"};
  border-radius: ${({ height }) => `${height * 0.08}rem`};
  background-color: #ffffff;
  overflow: hidden;
`;

const Input = styled.input`
  width: inherit;
  font-size: ${({ height }) => `${((height * 2) / 3) * 0.7}rem`};
`;

const WarningBox = styled.div`
  position: absolute;
  top: ${({ height, inputValue }) =>
    inputValue.length
      ? `${(height * 0.1) / 2}rem`
      : `${(height * 0.5) / 2}rem`};
  left: ${({ height }) => `${(((height * 2) / 3) * 0.3) / 2}rem`};
  font-size: ${({ height, inputValue }) =>
    inputValue.length
      ? `${((height * 1) / 3) * 0.7}rem`
      : `${((height * 2) / 3) * 0.7}rem`};
  color: ${({ isChange, isValidation, theme }) =>
    isChange === true && isValidation
      ? //한번이라도 입력했는데 벨리데이션을 통과 못함.
        "red"
      : isChange === true && !isValidation
      ? //한번이라도 입력한 후, 벨리데이션을 통과함.
        "blue"
      : theme.color.placeholderGray};
  transition: font-size 0.15s;
  pointer-events: none;
`;
