import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";

import IconText from "../IconText";

export default function Tab({ label, pathname }) {
  return (
    <Container to={pathname}>
      <IconText label={label} />
      <FaAngleRight />
    </Container>
  );
}

const Container = styled(Link)`
  display: flex;

  align-items: center;
  width: calc(50% - 0.5rem);
  height: 3rem;
  border: 1px solid #ddd;
  border-radius: 0.3rem;
  color: ${({ theme }) => theme.color.font};
  background-color: ${({ theme }) => theme.color.tabBack};
  font-size: 1rem;
  font-family: Roboto, "Noto Sans KR", sans-serif;

  &:hover {
    background-color: ${({ theme }) => theme.color.tabHover};
    > div {
      font-weight: bold;
    }
    /* svg {
      color: black;
    } */
  }

  > svg {
    margin-left: auto;
    margin-right: 1rem;
    color: #cccccc;
  }

  @media ${({ theme }) => theme.device.tablet} {
    width: calc(100%);
  }
`;
