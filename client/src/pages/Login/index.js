import React, { useState } from "react";
import styled from "styled-components";

import { InputChamber } from "../../components";
import script from "../../assets/images/scrip.png"
import leftHand from "../../assets/images/leftHand.png";
import rightHand from "../../assets/images/rightHand.png";

export default function Login() {
  const [isClicked,setIsClicked] = useState(false);

  return (
    <Container>
      <Frame isClicked={isClicked}>
        <RightHand src={rightHand} alt="hand" />
        <LeftHand src={leftHand} alt="hand" />
        <BackBoard src={script} alt="board" />
        <Fail isClicked={isClicked}>Fail_</Fail>
        <Title>비행 허가 신청서</Title>
        <InputChamber setIsClicked={setIsClicked} />
      </Frame>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  min-height: 79vh;
`;

const Title = styled.p`
  margin: ${({ theme }) => `${theme.fontSizes.base} 0`};
  font-size: ${({ theme }) => `${theme.fontSizes.base.split("rem")[0] * 3}rem`};
  font-family: ${({ theme }) => theme.fontFamily.blackHanSans};
  color: black;
  pointer-events: none;
  z-index: 2;

  @media ${({ theme }) => theme.device.tablet} {

  }
`;

const Fail = styled.p`
  position: absolute;
  /* top: ${({ theme }) => `${theme.fontSizes.base.split("rem")[0] * 9}rem`};
  left: ${({ theme }) => `${theme.fontSizes.base.split("rem")[0] * 8.5}rem`}; */
  top: 9rem;
  left:8rem;
  display: ${({ isClicked }) => (isClicked === "" ? "default" : "none")};
  font-size: ${({ theme }) => `${theme.fontSizes.base.split("rem")[0] * 5}rem`};
  font-family: ${({ theme }) => theme.fontFamily.luckiestGuy};
  color: red;
  transform: rotate(-28deg);
  z-index: 5;
  pointer-events: none;

  @media ${({ theme }) => theme.device.tablet} {
    /* display: none; */
    top: 2rem;
    left: 1rem;
  }
`;

const Frame = styled.div`
  position: relative;
  top: ${({ isClicked }) => (isClicked ? "-100vh" : 0)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${({ theme }) => `${theme.fontSizes.base.split("rem")[0] * 50}rem`};
  height: ${({ theme }) => `${theme.fontSizes.base.split("rem")[0] * 40}rem`};
  animation-name: ${({ isClicked }) => (isClicked ? "upSignup" : "downSignup")};
  animation-duration: 1.3s;
  animation-direction: normal;

  /* @media only screen and (max-width: 1150px) {
    width: 100vw;
    overflow: hidden;
  } */

  @media ${({ theme }) => theme.device.tablet} {
    max-width: 30rem;
    width: 100vw;
    border: 2rem solid #c9a164;
    border-radius: 1rem;
    background-color: #fdfbe5;
    height: 30rem;
    animation-name: "";
    overflow: hidden;
  }

  @keyframes downSignup {
    0% {
      top: -100vh;
    }
    100% {
      top: 0;
    }
  }

  @keyframes upSignup {
    0% {
      top: 0;
    }
    100% {
      top: -100vh;
    }
  }
`;

const BackBoard = styled.img`
  position: absolute;
  width: ${({ theme }) => `${theme.fontSizes.base.split("rem")[0] * 50}rem`};

  @media ${({ theme }) => theme.device.tablet} {
    display: none;
  }
`;

const Hand = styled.img`
  position: absolute;
  width: ${({ theme }) => `${theme.fontSizes.base.split("rem")[0] * 20}rem`};
  z-index: 2;

  @media only screen and (max-width: 1150px) {
    display: none;
  }

  @media ${({ theme }) => theme.device.tablet} {
    display: none;
  }
`;

const LeftHand = styled(Hand)`
  width: ${({ theme }) => `${theme.fontSizes.base.split("rem")[0] * 19.5}rem`};
  top: ${({ theme }) => `-${theme.fontSizes.base.split("rem")[0] * 18}rem`};
  right: ${({ theme }) =>
    `-${theme.fontSizes.base.split("rem")[0] * 10.3}rem`}; ;
`;

const RightHand = styled(Hand)`
  top: ${({ theme }) => `-${theme.fontSizes.base.split("rem")[0] * 16}rem`};
  left: ${({ theme }) => `-${theme.fontSizes.base.split("rem")[0] * 9.4}rem`}; ;
`;