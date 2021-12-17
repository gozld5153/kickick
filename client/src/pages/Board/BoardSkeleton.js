import React from "react";
import styled from "styled-components";

import { S_TotalSearch, S_BoardTop, S_BoardBottom } from "../../components";

export default function BoardSkeleton() {
  return (
    <>
      <S_BoardTop />
      <Container>
        <BoardContainer>
          <S_TotalSearch />
          <S_BoardBottom />
        </BoardContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  margin: 0 auto;
  width: 64rem;

  @media ${({ theme }) => theme.device.notebookS} {
    width: 100%;
  }
`;

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 64rem;

  @media ${({ theme }) => theme.device.notebookS} {
    width: 100%;
  }
`;
