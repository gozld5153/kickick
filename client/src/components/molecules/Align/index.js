import React from "react";
import styled from "styled-components";

import IconText, { iconList } from "../../atoms/IconText";

export default function Align({ handleAlign, category = "정렬" }) {
  return (
    <Container>
      {iconList
        .filter((el) => el.category === category)
        .map((el) => (
          <IconText key={el.label} label={el.label} handleClick={handleAlign} />
        ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;

  @media ${({ theme }) => theme.device.tablet} {
    > div {
      font-size: 1rem;
      svg {
        font-size: 1.5rem;
      }
    }
  }
`;
