import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Saturn from "../../../assets/images/planet/art.png"
import moon from "../../../assets/images/planet/economy.png";
import earth from "../../../assets/images/planet/leisure.png";
import Mars from "../../../assets/images/planet/life.png";
import Uranus from "../../../assets/images/planet/studyplanet.png";
import sun from "../../../assets/images/planet/trip.png";
import redGirl from "../../../assets/images/people/7.png";
import whiteGuy from "../../../assets/images/people/6.png";
import redhatGirl from "../../../assets/images/people/5.png";
import suitGuy from "../../../assets/images/people/4.png";
import checkGuy from "../../../assets/images/people/3.png";
import stranger from "../../../assets/images/icon/profileinfoicon.png";
import grass from "../../../assets/images/grass.png";
import cloud5 from "../../../assets/images/cloud/cloud5.png";
import star from "../../../assets/images/icon/kickmoney.png";

export default function MainMiniNav() {
  const navigate = useNavigate();
  const themeMode = useSelector((state) => state.themeMode);
  const peopleList = [
    ["학습", suitGuy, Uranus],
    ["여가", checkGuy, earth],
    ["생활", whiteGuy, Mars],
    ["경제", redGirl, moon],
    ["여행", stranger, sun],
    ["예술", redhatGirl, Saturn],
  ];
  const starLocation = [
    { top: "2vw", left: "2vw" },
    { top: "6vw", left: "8vw" },
    { top: "3vw", left: "11vw" },
    { top: "7vw", left: "20vw" },
    { top: "1vw", left: "30vw" },
    { top: "6vw", left: "42vw" },
    { top: "2vw", left: "52vw" },
    { top: "7vw", left: "55vw" },
    { top: "1vw", left: "60vw" },
  ];
  return (
    <Container>
      <ModeContainer isVisible={themeMode[1] === "light"}>
        <CloudUp left={0} src={cloud5} alt="cloud" />
        <CloudDown left={10} src={cloud5} alt="cloud" />
        <CloudUp left={23} src={cloud5} alt="cloud" />
        <CloudDown left={37} src={cloud5} alt="cloud" />
        <CloudUp left={50} src={cloud5} alt="cloud" />
        <CloudDown left={63} src={cloud5} alt="cloud" />
        <CloudUp left={76} src={cloud5} alt="cloud" />
        {peopleList.map((el) => (
          <BtnFrame key={el[0]} onClick={() => navigate(`/kickboard/${el[0]}`)}>
            <BtnName>{el[0]}</BtnName>
            <People src={el[1]} alt="people" />
          </BtnFrame>
        ))}
        <Grass src={grass} alt="grass" />
      </ModeContainer>
      <ModeContainer isVisible={themeMode[1] === "dark"}>
        <StarContainer>
          {starLocation.map((el) => (
            <Star src={star} top={el.top} left={el.left} alt="star" />
          ))}
        </StarContainer>
        {peopleList.map((el) => (
          <BtnFrame key={el[0]} onClick={() => navigate(`/kickboard/${el[0]}`)}>
            <BtnName>{el[0]}</BtnName>
            <Planet src={el[2]} alt="people" />
          </BtnFrame>
        ))}
      </ModeContainer>
    </Container>
  );
}

const Container = styled.div``;

const ModeContainer = styled.div`
  position: relative;
  display: ${({ isVisible }) => (isVisible ? "flex" : "none")};
  justify-content: space-around;
  align-items: flex-end;
  width: 80vw;
  height: 10vw;
  background-color: ${({ theme }) =>
    theme.type === "light" ? "#049be5" : "#0c0c42"};
  overflow: hidden;

  ${({ theme }) =>
    theme.type === "light"
      ? null
      : `
        > :nth-child(2n) {
        position: relative;
        top: -0.9vw;
      }
    `}
`;

const BtnFrame = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${({ theme }) => theme.fontFamily.jua};
  z-index: 3;

  ${({ theme }) =>
    theme.type === "light"
      ? null
      : `
        top: -1.4vw;
    `}
`;

const BtnName = styled.p`
  font-size: 1.2vw;
  color:${({theme}) => theme.color.font};
  pointer-events: none;
`;

const People = styled.img`
  width: 6vw;
  height: 8vw;
  pointer-events: none;
`;

const Planet = styled.img`
  width: 5vw;
  height: 5.5vw;
`;

const Grass = styled.img`
  position: absolute;
  bottom: -1vw;
  width: 80vw;
  pointer-events: none;
`;

const CloudUp = styled.img`
  position: absolute;
  top: 0.5vw;
  left: ${({ left }) => `${left}vw`};
  width: 7vw;
  z-index: 1;
  pointer-events: none;
`;

const CloudDown = styled(CloudUp)`
  top: 1.7vw;
`;

const StarContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 80vw;
  height: 10vw;
`;

const Star = styled.img`
  position: relative;
  top:${({ top }) => top};
  left:${({left})=> left};
  width: 2vw;
  height: 2vw;
`;