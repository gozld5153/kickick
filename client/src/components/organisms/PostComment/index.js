import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import {
  getComments,
  createComments,
  delComments,
} from "../../../apis/comments";
import { PostCommentInput, PostCommentItem, RectLoading } from "../../";

import {
  commentSocketAction,
  targetNameAction,
} from "../../../store/actions/socket";

import commenticon from "../../../assets/images/icon/commenticon.png";

export default function PostComment({ post_id, themeCode }) {
  const dispatch = useDispatch();
  const test = useRef();
  const { login, socket } = useSelector((state) => state);
  const { postInfo } = useSelector((state) => state.persist);
  const [cmt, setCmt] = useState({ data: [] });
  const [loading, setLoading] = useState(true);
  const [plusCmt, setPlusCmt] = useState(0);
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
        let dummy = cmt.data.slice();
        let obj = {};
        obj.comment_id = data.data.data.comment_id;
        obj.user = { username: data.data.data.username };
        obj.created_at = data.data.data.created_at;
        obj.content = data.data.data.content;
        dummy = [obj, ...dummy];
        setCmt({ ...cmt, data: dummy });
      })
      .then(() => setPlusCmt(plusCmt + 1))
      .then(() => dispatch(targetNameAction(postInfo.user.username)))
      .then(() => dispatch(targetNameAction("")))
      .catch((err) => console.log(err.response));
    setValue("");
  };

  //comment 지우기
  const handleDelComment = (id) => {
    delComments(id)
      .then(() => {
        const idx = cmt.data.findIndex((el) => el.comment_id === id);
        const newData = [...cmt.data.slice(0, idx), ...cmt.data.slice(idx + 1)];
        setCmt({ ...cmt, data: newData });
        setPlusCmt(plusCmt - 1);
      })
      .catch((err) => console.log(err.response));
  };

  //무한스크롤 스크롤 버전
  // const cmtFetch = (page) => {
  //   if (cmt.count === cmt.data.length) return;
  //   getComments(post_id, page)
  //     .then((data) => {
  //       let mergeCmt = data.data;
  //       mergeCmt = { ...cmt, ...mergeCmt };
  //       setCmt(mergeCmt);
  //       setLimit(limit + 1);
  //     })
  //     .catch((err) => console.log(err.response));
  // };

  // const handleScroll = useMemo(
  //   () =>
  //     throttle(() => {
  //       const scrollHeight = document.documentElement.scrollHeight;
  //       const scrollTop = document.documentElement.scrollTop;
  //       const clientHeight = document.documentElement.clientHeight;
  //       if (scrollTop + clientHeight >= scrollHeight) {
  //         setLoading(true);
  //         cmtFetch(10 * limit);
  //       }
  //       setLoading(false);
  //     }, 300),
  //   [limit]
  // );

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // });

  //IntersectionObserver API
  useEffect(() => {
    setLoading(true);
    getComments(postInfo.post_id, limit * 10)
      .then((data) => {
        setCmt(data.data);
        setPlusCmt(0);
        setLoading(false);
      })
      .catch((err) => console.error(err.response));
  }, [limit, postInfo.post_id]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-130px",
      threshold: 1,
    };
    let observer;
    const fetchelement = test.current;
    if (fetchelement) {
      observer = new IntersectionObserver(handleTest, options);
      observer.observe(fetchelement);
    }
    return () => observer.disconnect(fetchelement);
  }, [loading]);

  const testFunc = () => {
    if (cmt.count === cmt.data.length || !cmt.count) return;
    else {
      setLimit(limit + 1);
    }
  };
  const handleTest = (entry) => {
    if (entry[0].isIntersecting) testFunc();
  };

  return (
    <Container>
      <img src={commenticon} alt="" />
      <h3>댓글달기</h3>
      <PostCommentInput
        handleClick={handleClick}
        value={value}
        handleChange={handleChange}
        themeCode={themeCode}
      />
      <h3>
        댓글 <strong>{cmt.count + plusCmt}</strong>
      </h3>
      {cmt.data.map((el, idx) => (
        <PostCommentItem
          key={idx}
          item={el}
          handleDelComment={handleDelComment}
        />
      ))}
      {loading && <RectLoading />}
      <div ref={test}></div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.color.commentBox};
  margin: 3rem 0;
  border-radius: 0.5rem;

  > img {
    position: absolute;
    top: -2rem;
    left: -1rem;
    width: 3rem;
    height: 3rem;
  }

  h3 {
    margin: 1rem 0;
    padding: 0.5rem 0;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.color.font};
    @media ${({ theme }) => theme.device.mobileL} {
      font-size: 1rem;
    }
  }
  strong {
    color: skyblue;
  }
`;
