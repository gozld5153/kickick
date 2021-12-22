import React from "react";
import styled from "styled-components";

import notYet from "../../assets/images/notYet.png"

export default function Intro() {
  return (
    <Container>
      <NotYet>
        <MiniTitle>KICKICK</MiniTitle>
        <Title>서비스 준비중 입니다.</Title>
        <img src={notYet} alt="human" />
      </NotYet>
    </Container>
  );
}

const Container = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  min-height: 79vh;
`;

const NotYet = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > img {
    width: 20rem;
  }
`;

const Title = styled.div`
  font-size: 5rem;
  font-family: ${({ theme }) => theme.fontFamily.jua};
  color: ${({ theme }) => theme.color.font};

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 10vw;
  }
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