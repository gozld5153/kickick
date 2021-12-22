import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import lifeplanet from "../../assets/images/category/lifeplanet.png";
import contenticon from "../../assets/images/icon/contenticon.png";

export default function Page404() {
  const navigate = useNavigate();
  const { themeMode } = useSelector((state) => state);
  return (
    <Container>
      <div className="headline">
        <span>4</span>
        <img src={themeMode[1] === "light" ? lifeplanet : contenticon} alt="" />
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
      color: ${({ theme }) => theme.color.page404};
      font-size: 9rem;
      @media ${({ theme }) => theme.device.tablet} {
        font-size: 6rem;
      }
    }
    img {
      width: 7rem;
      height: 7rem;
      @media ${({ theme }) => theme.device.tablet} {
        width: 5rem;
        height: 5rem;
      }
    }
  }

  .title {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.color.page404};
    text-align: center;
    line-height: 2;
    @media ${({ theme }) => theme.device.tablet} {
      font-size: 1.1rem;
    }
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

    @media ${({ theme }) => theme.device.tablet} {
      font-size: 0.9rem;
      width: 6rem;
    }
  }

  .goback {
    background: #ddeeff;

    font-weight: bold;

    &:hover {
      opacity: 0.7;
    }
  }
`;
