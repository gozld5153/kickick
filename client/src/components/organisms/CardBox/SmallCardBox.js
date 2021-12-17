import React, { useState } from "react";
import styled from "styled-components";

import {
  PostStatics,
  Attendance,
  IconText,
  DonutChart,
} from "../../../components";
export default function SmallCardBox({ type = "statics", data }) {
  const [dropdownOn, setDropDownOn] = useState(false);

  return (
    <Container>
      {type === "statics" ? (
        <>
          <MainContainer>
            <PostStatics type="외계인" num={data.alien} />
            <PostStatics type="우주인" num={data.astronaut} />
            <PostStatics type="중립" num={data.common} />
          </MainContainer>
          <SubContainer>
            <StaticsContainer dropdown={dropdownOn}>
              <DonutChart data={data} />
            </StaticsContainer>
            <ToggleContainer onClick={() => setDropDownOn(!dropdownOn)}>
              {dropdownOn ? (
                <IconText label="닫기" />
              ) : (
                <IconText label="통계보기" />
              )}
            </ToggleContainer>
          </SubContainer>
        </>
      ) : (
        <MainContainer>
          <Attendance type="kick_money" num={data.kickmoney} />
          <Attendance type="serial_attendance" num={data.serial} />
        </MainContainer>
      )}
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-radius: 0.5rem 0.5rem 0 0;
  border: 1px solid #d8d8d8;
`;

const SubContainer = styled.div`
  border-radius: 0 0 0.5rem 0.5rem;
  border: 1px solid #d8d8d8;
  background: #eee;
`;

const StaticsContainer = styled.div`
  height: ${({ dropdown }) => (dropdown ? "15rem" : "0rem")};
  background: ${({ theme }) => theme.color.back};
  transition: height 0.15s linear;
  overflow: hidden;
`;

const ToggleContainer = styled.div`
  height: 3rem;
  padding: 0.5rem;
`;
