import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Outlet, useNavigate, useLocation } from "react-router";
import { NavLink } from "react-router-dom";

import { CardBox, BoardTop, IconText, Common } from "../../components";

import { getNoticesList } from "../../apis/notices";

import { getListAction } from "../../store/actions/postlist";

const noticeList = [
  { category: "소식", component: <News /> },
  { category: "이벤트", component: <Event /> },
];

export default function Notice({ themeCode }) {
  const navigate = useNavigate();
  const { category } = useParams();
  if (category !== "소식" && category !== "이벤트") {
    navigate("/error");
    return <div></div>;
  }

  const { component } = noticeList.find((el) => el.category === category);

  return (
    <>
      <BoardTop themeCode={themeCode} />
      <Container>
        <NavContainer>
          <h3>공지</h3>
          <NavLink to="/notice/소식">
            <IconText label="뉴스" />
          </NavLink>
          <NavLink to="/notice/이벤트">
            <IconText label="이벤트" />
          </NavLink>
        </NavContainer>
        <ContentContainer>
          <Outlet />
          {component}
        </ContentContainer>
      </Container>
    </>
  );
}

export function News() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postsearch, login } = useSelector((state) => state);
  const [loading, setLoading] = useState(true);

  const handleNewPost = () => {
    navigate("edit");
  };

  useEffect(() => {
    getNoticesList({
      type: "notices",
      limit: 10,
      page_num: postsearch.selectPage,
    }).then((data) => {
      dispatch(getListAction(data.data));
      setLoading(false);
    });
  }, [postsearch.selectPage, dispatch, pathname]);

  if (loading) return <div>d</div>;
  return (
    <NewsContainer>
      {login.isLogin.type === "admin" && (
        <Common type="new" label="글쓰기" handleClick={handleNewPost} />
      )}
      <CardBox type="news" />
    </NewsContainer>
  );
}

export function Event() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postsearch, login } = useSelector((state) => state);
  const [loading, setLoading] = useState(true);

  const handleNewPost = () => {
    navigate("edit");
  };

  useEffect(() => {
    getNoticesList({
      type: "events",
      limit: 10,
      page_num: postsearch.selectPage,
    }).then((data) => {
      dispatch(getListAction(data.data));
      setLoading(false);
    });
  }, [postsearch.selectPage, dispatch, pathname]);
  if (loading) return <div>d</div>;

  return (
    <EventContainer>
      {login.isLogin.type === "admin" && (
        <Common type="new" label="글쓰기" handleClick={handleNewPost} />
      )}
      <CardBox type="event" />
    </EventContainer>
  );
}

const Container = styled.div`
  display: flex;
  width: 90rem;
  margin: 3rem auto;
  gap: 1rem;
  min-height: 30vh;

  @media ${({ theme }) => theme.device.notebookL} {
    width: 64rem;
  }
  @media ${({ theme }) => theme.device.notebookS} {
    width: 48rem;
  }
  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
  }
  @media ${({ theme }) => theme.device.mobileL} {
    width: 100%;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 64rem;

  gap: 3rem;

  @media ${({ theme }) => theme.device.notebookL} {
    width: 100%;
  }
`;

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 12rem;
  height: 10rem;
  gap: 0.5rem;

  padding: 1rem;

  h3 {
    font-size: 0.8rem;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    color: gray;
  }

  a {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.color.font};
  }

  .active {
    color: purple;
    font-weight: bold;
  }

  @media ${({ theme }) => theme.device.notebookL} {
    display: none;
  }
`;

const EventContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const NewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 48rem;
  margin: 0 auto;
`;
