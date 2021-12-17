import React from "react";
import styled, { css } from "styled-components";
export default function TitleInput({
  holder = "제목을 입력하세요",
  handleKeyon,
  handleChange,
  handlePostName,
  val,
  title,
  type,
}) {
  return (
    <Title
      maxLength="30"
      placeholder={holder}
      onBlur={handlePostName}
      onKeyDown={handleKeyon}
      onChange={handleChange}
      value={val}
      defaultValue={title ? title : null}
      type={type}
    />
  );
}
const Title = styled.input`
  font-size: 1.2rem;
  /* border-bottom: 3px solid ${({ theme }) => theme.color.select}; */
  &:focus {
    /* border-bottom: 3px solid ${({ theme }) => theme.color.font}; */
  }

  ${({ type }) =>
    type === "title" &&
    css`
      font-size: 2.8rem;
      height: 4rem;
      padding: 0.5rem;
      font-weight: bold;
      color: ${({ theme }) => theme.color.font};
      caret-color: ${({ theme }) => theme.color.font};
      background: ${({ theme }) => theme.color.back};

      @media ${({ theme }) => theme.device.tablet} {
        font-size: 1.8rem;
      }
    `}

  ${({ type }) =>
    type === "tag" &&
    css`
      width: 10rem;
      padding: 0.5rem;
      color: ${({ theme }) => theme.color.font};
      caret-color: ${({ theme }) => theme.color.font};
      background: ${({ theme }) => theme.color.back};

      @media ${({ theme }) => theme.device.tablet} {
        width: 100%;
        font-size: 0.8rem;
      }
    `}
`;
