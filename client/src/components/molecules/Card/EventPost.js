import React from "react";
import styled from "styled-components";

import { useNavigate } from "react-router";

import { Thumbnail } from "../../../components";

export default function EventPost({ data }) {
  const navigate = useNavigate();

  return (
    <Container onClick={() => navigate(`/notice/이벤트/${data.notice_id}`)}>
      <Thumbnail src={data.thumbnail} type="event" />
      <Description>
        <h3 className="event_name">{data.notice_name}</h3>
        <div className="event_info">
          <span>{data.created_at}</span>
          <span>{data.user.username}</span>
        </div>
      </Description>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 14.5rem;

  margin: 0.75rem;

  border-radius: 0.2rem;
  box-shadow: 1px 1px 10px #444;

  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.25s ease-in;

  &:hover {
    box-shadow: none;
  }

  .event_name {
    font-size: 1rem;
    margin-bottom: 2rem;
    line-height: 1.5;
  }

  .event_info {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    color: gray;
  }

  @media ${({ theme }) => theme.device.tablet} {
    width: calc(50% - 1.5rem);
  }
  @media ${({ theme }) => theme.device.mobileL} {
    width: calc(100% - 1.5rem);
  }
`;

const Description = styled.div`
  padding: 0.75rem;
`;
