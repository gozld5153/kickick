import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import {
  DetailBoardTop,
  PostComment,
  IconContainer,
  Spinner,
} from "../../components";
import Page404 from "../Error/Page404";
import { getPostsInfo } from "../../apis/posts";

import { getPostInfoAction } from "../../store/actions/postinfo";

export default function DetailBoard({ type, themeCode }) {
  const { postInfo } = useSelector((state) => state.persist);
  const dispatch = useDispatch();
  const { post_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);

  useEffect(() => {
    getPostsInfo(post_id)
      .then((data) => {
        setErr(false);
        dispatch(getPostInfoAction(data.data.data));
      })
      .then(() => setLoading(false))
      .catch((err) => {
        setErr(true);
        console.log(err.response);
      });
  }, [dispatch, post_id, type]);

  if (err) return <Page404 />;
  if (loading) return <Spinner />;

  return (
    <Container>
      <IconContainer themeCode={themeCode} />
      <RightContainer>
        <DetailBoardTop postInfo={postInfo} type={type} themeCode={themeCode} />
        <PostComment post_id={post_id} themeCode={themeCode} />
      </RightContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  width: 48rem;
  margin: 0 auto;
  padding-top: 3rem;

  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
    flex-direction: column;
    padding: 0 1rem;
  }
`;

const RightContainer = styled.div`
  width: 42rem;
  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
  }
`;
