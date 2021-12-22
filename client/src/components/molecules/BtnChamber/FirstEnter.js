import React, { useState } from "react";
import styled from "styled-components";

import { ImageBtn } from "../../../components";
import earth from "../../../assets/images/category/lifeplanet.png";

export default function FirstEnter() {
  const [locate, setLocate] = useState({ x: 0, y: 0 });
  const [firstlocate, setFirstLocate] = useState({ x: 0, y: 0 });
  const [isMouseDown, setIsMouseDowm] = useState(false);

  const mouseMoveHanlder = (e) => {
    if (isMouseDown) {
      setLocate({
        x: firstlocate.x - e.clientX,
        y: firstlocate.y - e.clientY,
      });
    }
  };

  // 마우스에 따라 모달창이 이동하는 로직.

  return (
    <Container
      locate={locate}
      onMouseDown={(e) => {
        setIsMouseDowm(true);
        setFirstLocate({ x: e.clientX + locate.x, y: e.clientY + locate.y });
      }}
      onMouseUp={() => setIsMouseDowm(false)}
      onMouseMove={mouseMoveHanlder}
    >
      <TitleContainer>
        <Planet src={earth} alt="earth" />
        <Title>처음 방문하셨나요?</Title>
      </TitleContainer>
      <ContextContainer>
        <ImageBtn
          context={["우주 여행 가이드", "살펴보기"]}
          color="blue"
          file="astronaut"
          pathname="/intro"
          talk="네"
        />
        <ImageBtn
          context={["다시는", "표시하지 않기"]}
          color="red"
          file="alien"
          pathname="/"
          talk="아니요"
        />
      </ContextContainer>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  top: ${({ locate }) => `${-locate.y}px`};
  left: ${({ locate }) => `${-locate.x}px`};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 15rem;
  height: 18rem;
  padding: 2rem 0;
  border-radius: 0.5rem;
  background-color: white;
`;

const TitleContainer = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 1rem 0;
  pointer-events: none;
`;

const Planet = styled.img`
  position: relative;
  left: 0;
  width: 5rem;
  margin-bottom: 0.5rem;
`;

const Title = styled.p`
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fontFamily.blackHanSans};
`;

const ContextContainer = styled.article`
  display: flex;
  gap: 2rem;
`;
