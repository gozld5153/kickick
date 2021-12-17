import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import lifeplanet from "../../assets/images/planet/lifeplanet.png";

export default function Page404() {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="headline">
        <span>4</span>
        <img src={lifeplanet} alt="" />
        <span>4</span>
      </div>
      <p className="title">
        찾을 수 없는 페이지입니다.
        <br /> 현재 찾을 수 없는 페이지를 요청하셨습니다.
      </p>
      <ButtonContainer>
        <button className="goback" onClick={() => navigate(-1)}>
          뒤로가기
        </button>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  height: 60vh;
  font-weight: bold;

  .headline {
    display: flex;
    align-items: flex-end;
    gap: 0.5rem;

    span {
      color: #5070b6;
      font-size: 9rem;
    }
    img {
      width: 7rem;
      height: 7rem;
    }
  }

  .title {
    font-size: 1.5rem;
    color: #5070b6;
    text-align: center;
    line-height: 2;
  }

  .subtitle {
    text-align: center;
    line-height: 2;
    font-weight: normal;
    color: gray;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 2rem;

  button {
    padding: 0.8rem;
    font-size: 1.2rem;
    width: 10rem;
    border: 1px solid #eee;
    border-radius: 0.5rem;
  }

  .goback {
    background: #ddeeff;

    font-weight: bold;

    &:hover {
      opacity: 0.7;
    }
  }
`;
