import React from "react";
import styled from "styled-components";

import { CardBox } from "../../../components";

export default function MainEvent() {

  return (
    <Container>
      <CardBox type="event" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 80vw;
  justify-content: flex-start;
  font-family: ${({ theme }) => theme.fontFamily.jua};

  @media ${({ theme }) => theme.device.mobileL} {
    width: 80vw;
    justify-content: center;
  }
`;