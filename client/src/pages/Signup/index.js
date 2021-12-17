import React from "react";
import styled from "styled-components";

import { InputForm } from "../../components";

export default function Signup () {
  return (
    <Container>
      <InputForm />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  min-height: 79vh;
  overflow: hidden;
  /* animation-name: rightMove;
  animation-duration: 1s;
  animation-direction: normal;

  @keyframes rightMove {
    0% {
      right: -100vw;
    }
    100% {
      right: 0;
    }
  } */
`;
