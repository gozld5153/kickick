import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

export default function Write() {
  const { isLogin } = useSelector((state) => state.login);
  useEffect(() => {}, []);
  return (
    <Container>
      <Controller>
        <div className="writemode">새글작성중</div>
        <div className="type">
          <span>게시판 타입</span>
          <span>일반</span>
          <span>킥</span>
          {isLogin.type === "admin" && <span>공지</span>}
        </div>
        <div className="category">
          <span>카테고리</span>
          <span>일반</span>
          <span>킥</span>
          {isLogin.type === "admin" && <span>공지</span>}
        </div>
        <div className="editmode">
          <span>한개</span>
          <span>두개</span>
        </div>
      </Controller>
      <Outlet />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Controller = styled.div`
  display: flex;
  gap: 2rem;
  border-radius: 0.5rem;
  box-shadow: 1px 1px 7px #ddd;
  padding: 1rem;
  margin: 1rem 4rem;
  width: calc(50% - 4rem);
`;
