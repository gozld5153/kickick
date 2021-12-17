import React from "react";
import styled from "styled-components";

export default function S_BoardTop() {
  return (
    <Container>
      <div></div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 12rem;
  justify-content: center;
  background: ${({ theme }) => theme.color.boardTopBack}linear-gradient
    (to top, #ffffff, #6dd5fa, #2980b9);
  div {
    height: 4.8rem;
    width: 12rem;
    background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0.5) 50%,
        rgba(255, 255, 255, 0) 80%
      ),
      lightgray;
    background-repeat: repeat-y;
    background-size: 500px 100%;
    background-position: 0 0;
    animation: move 1s infinite;

    @keyframes move {
      to {
        background-position: 100% 0, 0 0;
      }
    }
  }
`;
