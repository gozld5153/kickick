import React from "react";
import styled from "styled-components";

import { Condition } from "../../../components";

export default function ConditionChamber({ conditionArr, width, height, conditonChecker }) {
  return (
    <Container width={width} height={height}>
      <InputTitle height={height}>회원 약관</InputTitle>
      {conditionArr.map((el, idx) => (
        <Condition
          width={width}
          height={height}
          essential={el.essential}
          context={el.context}
          description={el.description}
          conditonChecker={conditonChecker}
          key={idx}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => `${width}rem`};
  margin-top: ${({ height }) => `${height}rem`};
  border-bottom: ${({ height, theme }) =>
    `${height / 25}rem solid ${theme.color.border}`};

  @media ${({ theme }) => theme.device.mobileL} {
    width: 96vw;
  }
`;

const InputTitle = styled.div`
  margin: ${({ height }) => `${height / 5}rem 0 ${height / 4}rem 0`};
  font-size: ${({ height }) => `${height / 2}rem`};
  font-family: ${({ theme }) => theme.fontFamily.blackHanSans};
  color: ${({ theme }) => theme.color.font};
`;