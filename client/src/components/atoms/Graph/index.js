import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";

import Alien from "../../../assets/images/alien.svg";
import Astronaut from "../../../assets/images/astronaut.svg";
import innobubble from "../../../assets/images/innobubble.png";
import oddbubble from "../../../assets/images/oddbubble.png";
import { createLikes } from "../../../apis/likes";

import { targetNameAction } from "../../../store/actions/socket";

export default function Vote({ likes, is_liked, postId, username }) {
  const dispatch = useDispatch();
  const [alien, setAlien] = useState(likes.true);
  const [astronaut, setAstronaut] = useState(likes.false);
  const [type, setType] = useState(is_liked);

  const handleClick = (item) => {
    if (item === "true" && type === true) return;
    if (item === "false" && type === false) return;

    if (item === "true") {
      if (is_liked !== null) {
        setAstronaut(astronaut === 0 ? 0 : astronaut - 1);
        setAlien(alien + 1);
      } else {
        setAlien(alien + 1);
      }

      setType(true);
    } else {
      if (is_liked !== null) {
        setAstronaut(astronaut + 1);
        setAlien(alien === 0 ? 0 : alien - 1);
      } else {
        setAstronaut(astronaut + 1);
      }
      setType(false);
    }

    createLikes(postId, item)
      .then(() => dispatch(targetNameAction(username)))
      .then(() => dispatch(targetNameAction("")))
      .catch((err) => console.log(err.response));
  };
  return (
    <Container type={type}>
      <div className="imgbox">
        <img className="ballon ballon_alien" src={oddbubble} alt="" />
        <img src={Alien} onClick={() => handleClick("true")} alt="" />
      </div>
      <span className="vote alien" onClick={() => handleClick("true")}>
        {alien}
      </span>
      <span>VS</span>
      <span className="vote astronaut" onClick={() => handleClick("false")}>
        {astronaut}
      </span>
      <div className="imgbox">
        <img src={Astronaut} onClick={() => handleClick("false")} alt="" />
        <img className="ballon ballon_astronaut" src={innobubble} alt="" />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-weight: 550;

  margin: 5rem 0;

  img {
    width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;
  }
  .vote {
    border-radius: 0.5rem;
    padding: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
  }
  .alien {
    color: #d3e4cd;
    border: 2px solid #d3e4cd;
    ${({ type }) =>
      type === true &&
      css`
        color: green;
        border: 2px solid green;
      `}
  }
  .astronaut {
    color: #a2d2ff;
    border: 2px solid #a2d2ff;
    ${({ type }) =>
      type === false &&
      css`
        color: #42eaf5;
        border: 2px solid #42eaf5;
      `}
  }

  .imgbox {
    position: relative;
  }

  .ballon {
    position: absolute;
    width: 5rem;
    height: 5rem;
  }

  .ballon_astronaut {
    right: -100%;
    top: -200%;
  }

  .ballon_alien {
    left: -100%;
    top: -200%;
  }
`;
