import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { IconBox } from "../..";

import { selectPageAction } from "../../../store/actions/postsearch";

export default function Pagination({ count }) {
  const dispatch = useDispatch();
  const [selectDivPage, setSelectDivPage] = useState(0);
  const { selectPage, limitPage } = useSelector((state) => state.postsearch);

  const totalPage = count !== 0 ? Math.ceil(count / limitPage) : 1;
  const dividPage = Math.ceil(totalPage / limitPage);
  const firstPage = limitPage * (selectDivPage + 1) - (limitPage - 1);

  let lastPage = limitPage * (selectDivPage + 1);
  if (totalPage < lastPage) {
    lastPage = totalPage;
  }
  const handleLeftIdx = () => {
    if (selectPage === 1) return;
    if (selectPage === firstPage) {
      setSelectDivPage(selectDivPage - 1);
    }
    dispatch(selectPageAction(selectPage - 1));
  };
  const handleRightIdx = () => {
    if (selectPage === totalPage) return;
    if (
      selectPage === lastPage &&
      selectPage < totalPage &&
      selectDivPage < dividPage
    ) {
      setSelectDivPage(selectDivPage + 1);
    }
    dispatch(selectPageAction(selectPage + 1));
  };
  const handleDubleLeft = () => {
    if (selectDivPage === 0) return;
    setSelectDivPage(selectDivPage - 1);
    dispatch(selectPageAction(selectPage - limitPage));
  };
  const handleDubleRight = () => {
    if (selectDivPage + 1 >= dividPage) return;
    setSelectDivPage(selectDivPage + 1);
    dispatch(
      selectPageAction(() => {
        if (selectPage + limitPage > totalPage) {
          return totalPage;
        } else {
          return selectPage + limitPage;
        }
      })
    );
  };

  const handleClickNum = (idx) => {
    dispatch(selectPageAction(idx + 1 + selectDivPage * limitPage));
  };

  return (
    <Container>
      <IconBox label="doubleleft" handleClick={handleDubleLeft} />
      <IconBox label="left" handleClick={handleLeftIdx} />
      {Array(lastPage % limitPage === 0 ? limitPage : lastPage % limitPage)
        .fill(0)
        .map((el, idx) => {
          return (
            <PageNum
              key={idx}
              onClick={() => handleClickNum(idx)}
              isActive={idx + 1 + selectDivPage * limitPage === selectPage}
            >
              {idx + 1 + selectDivPage * limitPage}
            </PageNum>
          );
        })}
      <IconBox label="right" handleClick={handleRightIdx} />
      <IconBox label="doubleright" handleClick={handleDubleRight} />
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color.font};
  gap: 0.2rem;
`;

const PageNum = styled.div`
  width: 2rem;
  height: 2rem;
  text-align: center;
  line-height: 2rem;
  font-weight: bold;
  color: ${({ isActive, theme }) => (isActive ? "white" : theme.color.font)};
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.color.basicBtn : theme.color.back};
  cursor: pointer;
`;
