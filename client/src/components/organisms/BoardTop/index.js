import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useParams } from "react-router";

import study from "../../../assets/images/planet/studyplanet.png";
import leisure from "../../../assets/images/planet/leisure.png";
import life from "../../../assets/images/planet/life.png";
import economy from "../../../assets/images/planet/economy.png";
import trip from "../../../assets/images/planet/trip.png";
import art from "../../../assets/images/planet/art.png";
import sun from "../../../assets/images/sun.png";
import moon from "../../../assets/images/moon.png";
import cloud from "../../../assets/images/colorCloud.png";
import star from "../../../assets/images/stars.png";
import spacebackground from "../../../assets/images/space_background.jpg";

const list = [
  { label: "study", src: study, category: "학습", color: "#4aa6c1" },
  { label: "leisure", src: leisure, category: "여가", color: "#DDB362" },
  { label: "life", src: life, category: "생활", color: "#5070B6" },
  { label: "economy", src: economy, category: "경제", color: "#DE5C8A" },
  { label: "travel", src: trip, category: "여행", color: "#D04E3E" },
  { label: "art", src: art, category: "예술", color: "#EED548" },
  { label: "notice", src: sun, category: "소식", color: "#EED548" },
  { label: "event", src: moon, category: "이벤트", color: "#EED548" },
  // { label: "", src: "", category: "default", color: "#000000" },
];

export default function BoardTop({ themeCode }) {
  const { category } = useParams();
  const { color } = list.find((el) => el.category === category);
  const [select, setSelect] = useState(0);

  useEffect(() => {
    setSelect(list.findIndex((el) => category === el.category));
  }, [category]);
  return (
    <Container image={spacebackground} color={color} cloud={cloud}>
      {themeCode === "light" ? (
        <img className="cloud" src={cloud} alt="" />
      ) : (
        <img className="star" src={star} alt="" />
      )}
      <Lists>
        {category &&
          list.map((el, idx) => {
            return (
              <ListContainer
                style={{
                  marginTop: idx === 0 ? `-${select * 5}rem` : 0,
                }}
              >
                <img src={el.src} alt="" />
                <span>{el.label}</span>
              </ListContainer>
            );
          })}
      </Lists>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 12rem;

  justify-content: center;
  gap: 1rem;
  font-size: 4rem;
  background: ${({ theme }) => theme.color.Back} !important;

  pointer-events: none !important;

  > img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  span {
    color: #ddd;
    margin-top: 1rem;
    font-family: "Luckiest Guy", cursive;
    text-shadow: 0.4rem 0.4rem 0.3rem gray;
  }
`;

const Lists = styled.div`
  position: relative;

  height: 4.8rem;
  text-align: center;
  overflow: hidden;
  img {
    width: 4.5rem;
    height: 4.5rem;
    filter: drop-shadow(0.2rem 0.2rem 0.3rem gray);
    z-index: 5;
  }
`;

const ListContainer = styled.div`
  display: flex;
  align-items: center;
  height: 5rem;

  transition: all 0.5s linear;
`;
