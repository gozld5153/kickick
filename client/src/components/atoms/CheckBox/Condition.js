import React, { useState } from "react";
import styled from "styled-components";
import { FaCheck, FaCaretUp, FaCaretDown} from "react-icons/fa";


export default function Condition({
  width = 20,
  height = 3,
  essential = true,
  context = "약관에 동의합니다.",
  description = "약관 내용입니다.",
  conditonChecker,
}) {
  const [isChecked, setIsChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container isChecked={isChecked}>
      <InputContainer width={width} height={height} isChecked={isChecked}>
        <ContextContainer width={width} height={height}>
          <Icon height={height} isChecked={isChecked}>
            <FaCheck />
          </Icon>
          <input
            type="checkbox"
            onChange={() => {
              setIsChecked(!isChecked);
              setIsOpen(false);
              if (essential === true) {conditonChecker(context, !isChecked);}
            }}
          />
          <p>{`[${essential ? "필수" : "선택"}] ${context}`}</p>
        </ContextContainer>
        <Icon height={3} isChecked={true} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaCaretUp /> : <FaCaretDown />}
        </Icon>
      </InputContainer>
      <Description
        width={width}
        height={height}
        isOpen={isOpen}
        isChecked={isChecked}
      >
        {description}
      </Description>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.color.font};
  background-color: ${({ isChecked, theme }) =>
    isChecked ? theme.color.conditionHover : "default"};

  :hover {
    background-color: ${({ theme }) => theme.color.conditionHover};
  }
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: ${({ width }) => `${width}rem`};
  height: ${({ height }) => `${height}rem`};
  border-top: ${({ height, theme }) =>
    `${height / 25}rem solid ${theme.color.border}`};
  font-size: ${({ height }) => `${height / 3}rem`};

  input[type="checkbox"] {
    display: none;
  }

  @media ${({ theme }) => theme.device.mobileL} {
    width: 96vw;
  }
`;

const Icon = styled.div`
  margin: ${({ height }) => `${height / 5}rem`};
  font-size: ${({ height }) => `${height / 2.2}rem`};
  opacity: ${({ isChecked }) => (isChecked ? 1 : 0.5)};
  cursor: pointer;
  z-index:1;
`;


const ContextContainer = styled.label`
  display: flex;
  align-items: center;
  width: ${({ width, height }) => `${width - height}rem`};
  cursor: pointer;

  @media ${({ theme }) => theme.device.mobileL} {
    width: 96vw;
  }
`;

const Description = styled.div`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  width: ${({ width }) => `${width / 1.2}rem`};
  margin-bottom: ${({ height }) => `${height / 3}rem`};

  :hover {
    background-color: ${({ theme }) => theme.color.conditionHover};
  }

  @media ${({ theme }) => theme.device.mobileL} {
    width: ${96 / 1.2}vw;
  }
`;