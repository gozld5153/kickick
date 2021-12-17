import React, { useState } from "react";
import styled from "styled-components";

import { SignupInput } from "../../../components"

export default function SignupInputBox({
  width = 20,
  height = 3,
  title = "닉네임",
  type,
  part,
  placeholder,
  idx,
  inputHandler,
  duplicateCheckHanlder,
  moveNextInput,
  validation,
  vaildHanlder,
  inputRef,
}) {
  const [isChange, setIsChange] = useState(false);

  return (
    <Container>
      <InputTitle height={height}>{title}</InputTitle>
      <SignupInput
        type={type}
        part={part}
        width={width}
        height={height}
        inputHandler={inputHandler}
        duplicateCheckHanlder={duplicateCheckHanlder}
        placeholder={placeholder}
        validation={validation}
        moveNextInput={moveNextInput}
        inputRef={inputRef}
        idx={idx}
        isChange={isChange}
        setIsChange={setIsChange}
        vaildHanlder={vaildHanlder}
      />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${({ width }) => `${width}rem`};
`;

const InputTitle = styled.div`
  margin-top: ${({ height }) => `${height / 5}rem`};
  font-size: ${({ height }) => `${height / 2}rem`};
  font-family: ${({ theme }) => theme.fontFamily.blackHanSans};
  color: ${({ theme }) => theme.color.font};
`;
