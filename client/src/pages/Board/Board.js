import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { TotalSearch, BoardTop, PostList, Spinner } from "../../components";

import Page404 from "../Error/Page404";
import { getPostsList } from "../../apis/posts";

import { getListAction, resetListAction } from "../../store/actions/postlist";

import {
  getCategoryAction,
  resetTag,
  goBack,
} from "../../store/actions/postadd";
import { resetSearchReducerAction } from "../../store/actions/postsearch";

export default function Board({ themeCode, list }) {
  const { category } = useParams();
  const dispatch = useDispatch();
  const apiCategory = useSelector((state) => state.postAdd.category);
  const { postsearch, onoff } = useSelector((state) => state);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getCategoryAction(category));
    if (!onoff) {
      dispatch(resetTag());
      dispatch(resetSearchReducerAction());
    }
    dispatch(resetListAction());
    dispatch(goBack(false));
  }, [category, dispatch]);

  // useEffect(() => {
  //   dispatch(getCategoryAction(category));
  //   dispatch(resetSearchReducerAction());
  // }, [path, category, dispatch]);

  useEffect(() => {
    getPostsList({
      category: apiCategory,
      post_name: postsearch.title,
      username: postsearch.writer,
      tag: postsearch.tag,
      limit: 10,
      favorite_count: postsearch.align === "인기" ? 1 : null,
      page_num: postsearch.selectPage,
    })
      .then((data) => {
        dispatch(getListAction(data.data));
      })
      .then(() => setLoading(false))
      .catch((err) => console.log(err.response));
  }, [
    dispatch,
    apiCategory,
    loading,
    postsearch.selectPage,
    postsearch.title,
    postsearch.tag,
    postsearch.writer,
    postsearch.align,
  ]);

  if (!list.find((el) => el === category)) return <Page404 />;
  if (loading) return <Spinner />;
  return (
    <BigContainer>
      <BoardTop themeCode={themeCode} />
      <Container>
        <BoardContainer>
          <TotalSearch />
          <PostList type="freepost" />
        </BoardContainer>
      </Container>
    </BigContainer>
  );
}

const BigContainer = styled.div``;
const Container = styled.div`
  display: flex;
  margin: 0 auto;
  width: 64rem;

  @media ${({ theme }) => theme.device.notebookS} {
    width: 100%;
  }
`;

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 64rem;
  margin: 0 auto;

  @media ${({ theme }) => theme.device.notebookS} {
    flex-direction: column;
    width: 100%;
  }
`;
