import React, { useState } from "react";
import styled from "styled-components";

import { duplicationCheck } from "../../../apis/auth";

export default function SignupInput({
  type = "text",
  part = "username",
  inputHandler,
  validation = () => [true,"통과"],
  width = 20,
  height = 3,
  placeholder = "nickname1234",
  moveNextInput,
  duplicateCheckHanlder,
  inputRef,
  isChange,
  setIsChange,
  vaildHanlder,
  idx,
}) {
  const [inputValue, setInputValue] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isFocus, setFocus] = useState(false);

  const contextHandler = (e) => {
    setIsChange(true);
    setInputValue(e.target.value);
    vaildHanlder(idx, validation(e.target.value).isValid);
    inputHandler(part, e.target.value);
    duplicateCheckHanlder(idx, false);
    setIsDuplicate(false);
  };

  const duplicate = (part, value) => {
    const newObj = {};
    newObj[part] = value;
    duplicationCheck(newObj)
      .then(() => {
        setIsDuplicate(true);
        duplicateCheckHanlder(idx, true)
      })
      .catch(() => {
        setIsDuplicate(false);
        duplicateCheckHanlder(idx, false)
      });
  };

  const enterHanlder = (e, func) => {
    if (e.key === "Enter") {
      func(idx+1);
    }
  };
  // enter치면 이벤트 발생하는 함수 << 유틸로 뺴고싶음 이벤트랑 함수를 매개변수로 받는다

  return (
    <>
      <Container
        width={width}
        height={height}
        isChange={isChange}
        validation={validation}
        inputValue={inputValue}
        isFocus={isFocus}
      >
        <Input
          onChange={contextHandler}
          onKeyPress={(e) => enterHanlder(e, moveNextInput)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          type={type}
          value={inputValue}
          height={height}
          placeholder={placeholder}
          ref={inputRef}
        />
        <Duplication
          onClick={() => duplicate(part, inputValue)}
          part={part}
          height={height}
          vaildMessage={validation(inputValue).message}
          isDuplicate={isDuplicate}
        >
          중복체크
        </Duplication>
      </Container>
      <Warning
        height={height}
        isChange={isChange}
        validation={validation}
        inputValue={inputValue}
        isDuplicate={isDuplicate}
        part={part}
      >
        {validation(inputValue).message === "pass" && isDuplicate
          ? ""
          : validation(inputValue).message === "pass" && !isDuplicate
          ? "중복체크 버튼을 눌러주세요"
          : validation(inputValue).message}
      </Warning>
    </>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: ${({ width }) => `${width}rem`};
  height: ${({ height }) => `${height}rem`};
  margin: 0.5rem 0 0.2rem 0;
  padding: ${({ height }) => `${height * 0.08}rem`};
  border: 0.15rem solid;
  border-color: ${({ isChange, validation, inputValue, isFocus, theme }) =>
    isChange && validation(inputValue).isValid && isFocus
      ? "#44AA00"
      : isChange && !validation(inputValue).isValid && isFocus
      ? "#FF5655"
      : theme.color.border};
  border-radius: ${({ height }) => `${height * 0.04}rem`};
  background-color: ${({ theme }) => theme.color.modalBack};
  overflow: hidden;

  @media ${({ theme }) => theme.device.mobileL} {
    justify-content: center;
    width: inherit;
  }
`;

const Input = styled.input`
  position: relative;
  top: ${({ height }) => `${height * 0.08}rem`};
  width: inherit;
  font-size: ${({ height }) => `${height * 0.6}rem`};
  font-family: ${({ theme }) => theme.fontFamily.jua};
  color: ${({ theme }) => theme.color.font};
  background-color: ${({ theme }) => theme.color.modalBack};

  ::placeholder {
    opacity: 0.7;
    color: ${({ theme }) => theme.color.placeholderGray};
  }

  @media ${({ theme }) => theme.device.mobileL} {
    font-size: ${({ height }) => `${height * 0.5}rem`};
  }
`;

const Warning = styled.div`
  padding-left: ${({ height }) => `${height / 15}rem`};
  visibility: ${({ isChange, validation, inputValue, isDuplicate, part }) =>
    !isChange ||
    (validation(inputValue).isValid &&
      (isDuplicate || part === "password" || part === "passwordCheck"))
      ? "hidden"
      : "visible"};
  font-family: ${({ theme }) => theme.fontFamily.jua};
  color: #ff5655;
`;


const Duplication = styled.button`
  position: absolute;
  right: 0;
  bottom: ${({ height }) => `${height / 4.5}rem`};
  display: ${({ part, vaildMessage, isDuplicate }) =>
    part !== "password" &&
    part !== "passwordCheck" &&
    vaildMessage === "pass" &&
    !isDuplicate
      ? "default"
      : "none"};
  width: ${({ height }) => `${height * 1.5}rem`};
  font-size: ${({ height }) => `${height / 3}rem`};
  font-family: ${({ theme }) => theme.fontFamily.jua};
  color: ${({ theme }) => theme.color.font};
  cursor: pointer;
`;