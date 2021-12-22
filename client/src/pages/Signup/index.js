import React from "react";
import styled from "styled-components";

import { InputForm } from "../../components";

export default function Signup () {
  return (
    <Container>
      <MiniTitle>KICKICK</MiniTitle>
      <Title>비행사 등록 신청서</Title>
      <InputForm />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
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

const Title = styled.p`
  margin: 0.5rem 0;
  font-size: 2.5rem;
  font-family: ${({ theme }) => theme.fontFamily.blackHanSans};
  color: ${({ theme }) => theme.color.font};
`;

const MiniTitle = styled.div`
  display: none;

  @media ${({ theme }) => theme.device.tablet} {
    display: inline;
    margin-top: 1.5rem;
    font-size: 4rem;
    font-family: ${({ theme }) => theme.fontFamily.luckiestGuy};
    color: ${({ theme }) => theme.color.font};
  }
`;