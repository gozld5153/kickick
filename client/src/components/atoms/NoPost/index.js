import React from "react";
import styled from "styled-components";

import noposticon from "../../../assets/images/icon/noposticon.png";
import questionicon from "../../../assets/images/icon/questionicon.png";

export default function NoPost() {
  return (
    <Container>
      <ImageContainer>
        <img src={noposticon} alt="" />
        <img src={questionicon} alt="" />
      </ImageContainer>
      <strong>등록된 것이</strong> 없습니다
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  align-items: center;
  font-size: 2.5rem;
  margin: 2rem auto;
  font-weight: bold;
  height: 30rem;

  strong {
    font-size: 3rem;
    display: block;
    color: skyblue;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  position: relative;

  img {
    width: 5rem;
    height: 5rem;
  }

  img:nth-of-type(2) {
    position: absolute;
    left: 3rem;
    top: -2rem;
  }
`;
