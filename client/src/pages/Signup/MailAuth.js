import React, { useState, useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import styled from "styled-components";

import { mailCheck } from "../../apis/auth"
import mailSuccess from "../../assets/images/mailSuccess.png"
import stamp from "../../assets/images/stamp.png";
import pushHand from "../../assets/images/pushHand.png";

export default function MailAuth() {
  const navigate = useNavigate();
  const params = useParams();

  const [isSuccess, setIsSuccess] = useState(null)
  const [isClick, setIsClick] = useState(false)

  useEffect(() => { 
    mailCheck(params.username)
      .then((res) => {
        if (res.data.message === "ok") {
          setIsSuccess(true);
        }
      })
      .catch(() => navigate("/error", { replace:true }));
  },[])

  console.log("params: ", params.username)
  return (
    <Container isSuccess={isSuccess}>
      <PushHand src={pushHand} alt="hand" isClick={isClick} />
      <LetterContainer isClick={isClick}>
        <BackImg src={mailSuccess} alt="appointment letter" />
        <Frame
          onClick={() => {
            setTimeout(() => navigate("/login", { replace: true }), 3000);
            setIsClick(true);
          }}
        >
          <Title>임명장</Title>
          <Name>성명 : {params.username}</Name>
          <Context>상기 인물은 이메일 테스트를 성공적으로 수행한 바</Context>
          <Context>차후 임무를 수행함에 있어 부족함이 없다고 판단하여</Context>
          <Context>정식 우주비행사로 임명함.</Context>
          <Stamp src={stamp} alt="stamp" />
          <Contribute>INOVATION & GEEK</Contribute>
          <ContributeName>
            <Contribute>인사담당</Contribute> 한 태 규
          </ContributeName>
        </Frame>
      </LetterContainer>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  width:100vw;
  min-height: 79vh;
  visibility: ${({ isSuccess }) => (isSuccess ? "visible" : "hidden")};
`;

const LetterContainer = styled.div`
  position: relative;
  bottom: ${({ isClick }) => (isClick ? "100vw" : 0)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation-name: ${({ isClick }) => (isClick ? "pushedUp" : "")};
  animation-duration: 1.7s;
  animation-direction: normal;

  @keyframes pushedUp {
    0% {
      bottom: 0;
    }
    22% {
      bottom: 0;
    }
    100% {
      bottom: 60vw;
    }
  } ;
`;

const Frame = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 55vw;
  height: 35vw;
  padding: 5vw 2vw 0;
  z-index: 2;
  cursor: pointer;
`;

const Title = styled.p`
  font-size: 5vw;
`;

const Name = styled.p`
  align-self: flex-end;
  margin: 0.3vw 1vw 0 0;
  font-size: 1.5vw;
`;

const Context = styled.p`
  margin: 0.3vw;
  font-size: 2vw;

  :nth-child(3) {
    margin-top: 2vw;
  }
`;

const Contribute = styled.span`
  margin-top:4vw;
  font-size: 1.4vw;
  font-weight: 600;
  z-index: 4;
`;

const ContributeName = styled.p`
  font-size: 2.2vw;
  z-index: 4;
`;

const BackImg = styled.img`
  position: absolute;
  height: 60vw;
  width: 40vw;
  transform: rotate(90deg);
`;

const Stamp = styled.img`
  position: absolute;
  bottom: 4vw;
  right: 18vw;
  width: 7vw;
  opacity: 0.9;
  z-index: 3;
`;

const PushHand = styled.img`
  position: absolute;
  bottom: -38vw;
  display: ${({ isClick }) => (isClick ? "default" : "none")};
  z-index: 5;
  animation-name: ${({ isClick }) => (isClick ? "pushUp" : "")};
  animation-duration: 3s;
  animation-direction: normal;

  @keyframes pushUp {
    0% {
      bottom: -38vw;
    }
    50% {
      bottom: 30vw;
    }
    100% {
      bottom: -38vw;
    }
  } ;
`;