import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useParams, useLocation } from "react-router";

import studyplanet from "../../../assets/images/category/studyplanet.png";
import leisureplanet from "../../../assets/images/category/leisureplanet.png";
import lifeplanet from "../../../assets/images/category/lifeplanet.png";
import economyplanet from "../../../assets/images/category/economyplanet.png";
import travelplanet from "../../../assets/images/category/travelplanet.png";
import artplanet from "../../../assets/images/category/artplanet.png";
import noticeplanet from "../../../assets/images/icon/introductionicon.png";
import eventplanet from "../../../assets/images/icon/contenticon.png";
import studyland from "../../../assets/images/category/studyland.png";
import leisureland from "../../../assets/images/category/leisureland.png";
import lifeland from "../../../assets/images/category/lifeland.png";
import economyland from "../../../assets/images/category/economyland.png";
import travelland from "../../../assets/images/category/travelland.png";
import artland from "../../../assets/images/category/artland.png";
import noticeland from "../../../assets/images/category/noticeland.png";
import eventland from "../../../assets/images/category/eventland.png";

import cloud from "../../../assets/images/colorCloud.png";
import star from "../../../assets/images/stars.png";

const list = [
  { label: "study", src: [studyland, studyplanet], category: "학습" },
  { label: "leisure", src: [leisureland, leisureplanet], category: "여가" },
  { label: "life", src: [lifeland, lifeplanet], category: "생활" },
  { label: "economy", src: [economyland, economyplanet], category: "경제" },
  { label: "travel", src: [travelland, travelplanet], category: "여행" },
  { label: "art", src: [artland, artplanet], category: "예술" },
  { label: "notice", src: [noticeland, noticeplanet], category: "소식" },
  { label: "event", src: [eventland, eventplanet], category: "이벤트" },
];

export default function BoardTop({ themeCode }) {
  const { category } = useParams();
  const { pathname } = useLocation();
  const [select, setSelect] = useState(0);
  const page = pathname.split("/")[1];

  useEffect(() => {
    setSelect(list.findIndex((el) => category === el.category));
  }, [category]);

  return (
    <Container cloud={cloud}>
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
                key={idx}
                style={{
                  marginTop: idx === 0 ? `-${select * 5}rem` : 0,
                }}
              >
                <img
                  src={themeCode === "light" ? el.src[0] : el.src[1]}
                  alt=""
                />

                <span>{el.label}</span>
                {page === "kickboard" && <h3>KICK</h3>}
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
  height: 10rem;

  justify-content: center;
  gap: 1rem;
  font-size: 3.5rem;
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
    letter-spacing: 0.2rem;
  }

  h3 {
    margin-left: 1rem;
    margin-top: 0.2rem;
    color: ${({ theme }) => theme.color.font};
    font-family: "Luckiest Guy", cursive;
    font-size: 2rem;
    padding: 0.8rem 0.8rem 0 0.8rem;
    border-radius: 0.5rem;
    background: ${({ theme }) => theme.color.boardTopKick};
    letter-spacing: 0.1rem;
  }
`;

const Lists = styled.div`
  position: relative;

  height: 4.8rem;
  text-align: center;
  overflow: hidden;
  img {
    width: 4rem;
    height: 4rem;
    filter: drop-shadow(0.2rem 0.2rem 0.3rem gray);
    z-index: 5;
    margin-right: 1rem;
  }
`;

const ListContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
  width: 30rem;
  transition: all 0.5s linear;
`;
