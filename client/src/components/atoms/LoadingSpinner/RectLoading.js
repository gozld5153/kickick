import React from "react";
import styled from "styled-components";

export default function RectLoading() {
  return (
    <Spinner>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Spinner>
  );
}

const Spinner = styled.div`
  width: 10rem;
  height: 50vh;
  margin: 1rem auto;
  text-align: center;
  font-size: 1rem;
  div {
    height: 5rem;
    width: 1rem;
    margin-right: 0.2rem;
    background-color: #0c0c42;
    display: inline-block;
    animation: sk-stretchdelay 0.6s infinite ease-in-out;
  }
  @keyframes sk-stretchdelay {
    0%,
    40%,
    100% {
      transform: scaleY(0.4);
    }
    20% {
      transform: scaleY(1);
    }
  }

  > :nth-child(2) {
    animation-delay: -0.5s;
  }
  > :nth-child(3) {
    animation-delay: -0.4s;
  }
  > :nth-child(4) {
    animation-delay: -0.3s;
  }
  > :nth-child(5) {
    animation-delay: -0.2s;
  }
`;
