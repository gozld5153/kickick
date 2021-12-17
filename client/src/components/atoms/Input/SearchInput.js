import React from "react";
import styled from "styled-components";

import { FaSearch } from "react-icons/fa";

export default function SearchInput({ handleSearch, handleInput, word }) {
  return (
    <Container>
      <Search
        type="text"
        placeholder="검색어를 입력하세요."
        value={word}
        onChange={handleInput}
        onKeyPress={(e) => {
          if (
            (e.code === "Enter" && word) ||
            (e.code === "NumpadEnter" && word)
          )
            handleSearch(e);
        }}
      />
      <IconContainer>
        <FaSearch style={{ cursor: "pointer" }} onClick={handleSearch} />
      </IconContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 15rem;
`;

const Search = styled.input`
  width: 100%;
  height: 80%;

  border-bottom: 1px solid ${({ theme }) => theme.color.select};
  font-size: 1rem;
  background-color: transparent;
  color: ${({ theme }) => theme.color.font};
  caret-color: ${({ theme }) => theme.color.font};
  &:focus {
    border-bottom: 1px solid ${({ theme }) => theme.color.font};
  }
`;
const IconContainer = styled.div`
  color: ${({ theme }) => theme.color.font};
`;
