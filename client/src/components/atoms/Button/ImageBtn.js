import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import disableScroll from "disable-scroll";

import { firstEnter } from "../../../apis/cookie"
import alien from "../../../assets/images/alien.svg"
import astronaut from "../../../assets/images/astronaut.svg";
import talkBubble from "../../../assets/images/talkBubble.png";
import { signUp, tempoSignIn } from "../../../apis/auth";
import {
  isLoginAction,
  isPointAction,
} from "../../../store/actions/login";

export default function ImageBtn({
  context = ["킥에 대해", "알아보러 가기"],
  color = "blue",
  file = "alien",
  pathname = "/",
  talk="아니요"
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const movePage = () => {
    if (pathname === "/") {
      neverSeeNext();
    } else {
      tempoAuth();
    }
  }

  const tempoAuth = () => {
    firstEnter(true)
      .then(() => {
        signUp({ type: "guest" }).then((res) => {
          if (res.data.message === "guest 회원가입") {
            tempoSignIn(res.data.data.username)
              .then((res) => {
                dispatch(isLoginAction(res.data.data));
                dispatch(isPointAction(res.data.data.kick_money));
                disableScroll.off();
              })
              .then(() => navigate(pathname, { replace: true }))
              .catch(() => navigate("/err", { replace: true }));
          }
        });
      })
      .catch(() => navigate("/err", { replace: true }));
  };

  const neverSeeNext = () => {
    firstEnter(true)
      .then(() => {
        disableScroll.off();
        navigate(pathname, { replace: true })
      })
      .catch(() =>navigate("/err", { replace: true }));
  }
  return (
    <Container onClick={movePage}>
      <SpeechBubbleContainer>
        <BubbleImg src={talkBubble} alt="talkBubble" />
        <BubbleText file={file}>{talk}</BubbleText>
      </SpeechBubbleContainer>
      <ImageFrame>
        <MainImg src={file === "alien" ? alien : astronaut} alt="alien" />
      </ImageFrame>
      {context.map((el) => (
        <Context color={color}>{el}</Context>
      ))}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top:1rem;
  font-family: ${({ theme }) => theme.fontFamily.blackHanSans};
  cursor: pointer;
`;

const SpeechBubbleContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content:center;
  align-items: center;
`;

const BubbleImg = styled.img`
  position: absolute;
  top:-2rem;
  right:-1rem;
  width: 3rem;
`;

const BubbleText = styled.p`
  position: relative;
  top: -1.4rem;
  right: ${({ file }) => (file === "alien" ? "-0.9rem" : "0rem")};
  white-space: nowrap;
  z-index: 3;
`;

const ImageFrame = styled.div`
`;

const MainImg = styled.img`
  width:2rem;
`;

const Context = styled.p`
  margin-bottom: 0.2vw;
  width: 4rem;
  padding: 0 0.1rem;
  /* border-bottom: 1px solid ${({ color }) => color}; */
  color: ${({ color }) => color};
  text-align: center;
  text-decoration: underline;
`;