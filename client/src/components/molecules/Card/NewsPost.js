import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
export default function NewsPost({ data }) {
  const navigate = useNavigate();
  return (
    <Container onClick={() => navigate(`${data.notice_id}`)}>
      <LogoBox>KICK</LogoBox>
      <ContentContainer>
        <h2>{data.notice_name} </h2>
        <DetailInfo>
          <span>{data.created_at}</span>
          <span>운영자</span>
        </DetailInfo>
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid #d8d8d8;
  padding: 1rem;
  width: 100%;
`;

const LogoBox = styled.div`
  font-size: 2rem;

  font-family: "Luckiest Guy", cursive;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 4rem;

  cursor: pointer;

  h2 {
    font-size: 1.5rem;
    font-weight: normal;
    margin-bottom: 1rem;
    &:hover {
      color: gray;
    }
  }
`;

const DetailInfo = styled.div`
  display: flex;

  span {
    color: gray;
    margin-right: 1rem;
  }
`;
