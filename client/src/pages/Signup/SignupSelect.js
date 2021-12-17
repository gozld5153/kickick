import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Traveler from "../../assets/images/Traveler.png";
import Admin from "../../assets/images/Admin.png";

export default function SignupSelect() {
  const navigate = useNavigate();
  const list = [
    { name: "Traveler", img: Traveler, size: "40" },
    { name: "Admin", img: Admin, size: "50" },
  ];

  const [isChoice, setIsChoice] = useState("")

  const moveLogin = (path) => {
    navigate(`/signup/${path}`, { replace: true });
  }
  
  console.log(isChoice);
  return (
    <Container isChoice={isChoice}>
      <CenterText>VS</CenterText>
      {list.map((el) => (
        <TypeBtn key={el.name}>
          <BackImgContainer>
            <BackImg src={el.img} size={el.size} alt="backimg" />
          </BackImgContainer>
          <BtnContext
            onClick={() => {
              setIsChoice(el.name);
              setTimeout(() => moveLogin(el.name), 900);
            }}
          >
            {el.name}
          </BtnContext>
        </TypeBtn>
      ))}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  left: ${({ isChoice }) => (isChoice ? `-100vw` : 0)};
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 79vh;
  transition: left 1s;
`;

const TextBox = styled.button`
  font-size: 6rem;
  font-family: ${({ theme }) => theme.fontFamily.luckiestGuy};
  -webkit-text-stroke: 0.4rem white;
  cursor: default;
`;

const CenterText = styled(TextBox)`
  position: absolute;
`;

const TypeBtn = styled(TextBox)`
  position: relative;
  width: 50%;
  height: 79vh;
`;

const BtnContext = styled(TextBox)`
  position: absolute;
  top: 3rem;
  left: 8rem;
  width: 40rem;
  height: 40rem;
  cursor: pointer;
`;

const BackImgContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 79vh;
  z-index: 0;
`;

const BackImg = styled.img`
  width: ${({ size }) => `${size}rem`};
  height: ${({ size }) => `${size}rem`};
`;
