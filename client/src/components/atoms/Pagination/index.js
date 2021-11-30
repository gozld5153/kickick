import React, { useState } from "react";
import styled from "styled-components";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";

export default function Pagination() {
  const [totalPage, setTotalPage] = useState(12);
  const limitPage = 6;
  const [selectPage, setSelectPage] = useState(1);
  const dividPage = Math.ceil(totalPage / limitPage);
  const [selectDividPage, setSelectDividPage] = useState(0);

  const firstPage = limitPage * (selectDividPage + 1) - (limitPage - 1);
  let lastPage = limitPage * (selectDividPage + 1);

  if (totalPage < lastPage) {
    lastPage = totalPage;
  }

  const handleLeftIdx = () => {
    if (selectPage === 1) return;
    if (selectPage === firstPage) {
      setSelectDividPage(selectDividPage - 1);
    }
    setSelectPage(selectPage - 1);
  };
  const handleRightIdx = () => {
    if (selectPage === totalPage) return;
    if (
      selectPage === lastPage &&
      selectPage < totalPage &&
      selectDividPage < dividPage
    ) {
      setSelectDividPage(selectDividPage + 1);
    }
    setSelectPage(selectPage + 1);
  };
  const handleDubleLeft = () => {
    if (selectDividPage === 0) return;
    setSelectDividPage(selectDividPage - 1);
    setSelectPage(selectPage - limitPage);
  };
  const handleDubleRight = () => {
    if (selectDividPage + 1 >= dividPage) return;
    setSelectDividPage(selectDividPage + 1);
    setSelectPage(() => {
      if (selectPage + limitPage > totalPage) {
        return totalPage;
      } else {
        return selectPage + limitPage;
      }
    });
  };
  return (
    <Container>
      <IconContainer onClick={handleDubleLeft}>
        <FaAngleDoubleLeft />
      </IconContainer>
      <IconContainer onClick={handleLeftIdx}>
        <FaAngleLeft />
      </IconContainer>
      {Array(lastPage % limitPage === 0 ? limitPage : lastPage % limitPage)
        .fill(0)
        .map((el, idx) => {
          return (
            <PageNum
              onClick={() =>
                setSelectPage(idx + 1 + selectDividPage * limitPage)
              }
              isActive={idx + 1 + selectDividPage * limitPage === selectPage}
            >
              {idx + 1 + selectDividPage * limitPage}
            </PageNum>
          );
        })}
      <IconContainer onClick={handleRightIdx}>
        <FaAngleRight />
      </IconContainer>
      <IconContainer onClick={handleDubleRight}>
        <FaAngleDoubleRight />
      </IconContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
`;

const IconContainer = styled.div`
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;

  text-align: center;
  line-height: 2rem;
  cursor: pointer;
`;

const PageNum = styled.div`
  width: 2rem;
  height: 2rem;
  text-align: center;
  line-height: 2rem;
  font-weight: bold;
  color: ${({ isActive }) => (isActive ? "#ffffff" : "#222222")};
  background-color: ${({ isActive }) => (isActive ? "#0c0c42" : "#ffffff")};
  cursor: pointer;
`;