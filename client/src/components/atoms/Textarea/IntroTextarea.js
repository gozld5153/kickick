import React from "react";
import styled from "styled-components";

export default function IntroTextarea({ handleTextarea, handleViewIntro }) {
  return <Container onBlur={handleTextarea} onChange={handleViewIntro} />;
}

const Container = styled.textarea`
  height: 6rem;
  padding: 1rem;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.color.font};
  background-color: ${({ theme }) => theme.color.back};
  resize: none;
  /* &:focus {
    border: 3px solid #ccc;
  } */
`;
