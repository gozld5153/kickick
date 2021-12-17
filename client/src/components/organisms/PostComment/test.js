import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import {
  PostCommentInput,
  PostCommentItem,
  RectLoading,
  InfiniteScroll,
} from "../../../components";

import {
  getComments,
  createComments,
  delComments,
} from "../../../apis/comments";

import {
  getCommentsAction,
  refreshCommentsAction,
} from "../../../store/actions/comments";

export default function PostComment({ post_id }) {
  const dispatch = useDispatch();
  const { login } = useSelector((state) => state);
  const { data, count, refresh } = useSelector((state) => state.comments);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(1);
  //textarea
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    if (e.target.value.length <= 200) {
      setValue(e.target.value);
    } else {
      return;
    }
  };

  const handleClick = () => {
    if (!login.isLogin) return;
    createComments(post_id, value)
      .then((data) => {
        dispatch(refreshCommentsAction());
      })
      .catch((err) => console.log(err.response));
    setValue("");
  };

  //comment 지우기
  const handleDelComment = (id) => {
    delComments(id)
      .then(() => {
        dispatch(refreshCommentsAction());
      })
      .catch((err) => console.log(err.response));
  };

  //IntersectionObserver API
  useEffect(() => {
    // setLoading(true);
    getComments(post_id, limit * 10)
      .then((data) => {
        dispatch(getCommentsAction(data.data));
        // setLoading(false);
      })
      .catch((err) => console.error(err.response));
  }, [post_id, refresh, limit, dispatch]);

  const testFunc = () => {
    if (count === data.length || !count) return;
    else {
      setLimit(limit + 1);
    }
  };
  return (
    <Container>
      <H3>댓글달기</H3>
      <PostCommentInput
        handleClick={handleClick}
        value={value}
        handleChange={handleChange}
      />
      <H3>
        댓글 <strong>{count}</strong>
      </H3>
      {data.map((el, idx) => (
        <PostCommentItem
          key={idx}
          item={el}
          handleDelComment={handleDelComment}
        />
      ))}
      {/* {loading && <RectLoading />} */}
      <InfiniteScroll callback={testFunc} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    color: skyblue;
  }
`;

const H3 = styled.div`
  margin: 1rem 0;
  padding: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
`;
