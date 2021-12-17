import React from "react";
import styled from "styled-components";

import { useNavigate } from "react-router";

import { Thumbnail, Profile } from "../../../components";
export default function MyKick({ data }) {
  const navigate = useNavigate();

  return (
    <Container onClick={() => navigate(`/detailkick/${data.kick_id}`)}>
      <Thumbnail src={data.thumbnail} type="kick" />
      <Description>
        <h3 className="post_name">{data.post_name}</h3>
        <div className="post_info">
          <Profile src={data.user.profile} type="post" />
          <span>{data.user.username}</span>
        </div>
      </Description>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.color.tabHover};
  }
`;
const Description = styled.div`
  padding: 1rem;

  .post_name {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }

  .post_info {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    color: gray;
  }
  span {
    margin-left: 0.5rem;
  }
`;
