import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Outlet, useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";

import { CardBox, BoardTop, IconText, Common, Spinner } from "../../components";

import { getNoticesList } from "../../apis/notices";

import { getListAction } from "../../store/actions/postlist";
import { resetPaginationAction } from "../../store/actions/postsearch";
const noticeList = [
  { category: "소식", component: <News /> },
  { category: "이벤트", component: <Event /> },
];

export default function Notice({ themeCode }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { category } = useParams();
  const route = decodeURI(pathname.split("/")[2]);

  useEffect(() => {
    dispatch(resetPaginationAction());
  }, [dispatch]);

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
          <StyledLink
            to="/notice/소식"
            highlight={(route === "소식").toString()}
          >
            <IconText label="뉴스" />
          </StyledLink>
          <StyledLink
            to="/notice/이벤트"
            highlight={(route === "이벤트").toString()}
          >
            <IconText label="이벤트" />
          </StyledLink>
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

  if (loading) return <Spinner />;
  return (
    <>
      <NewsContainer>
        <CardBox type="news" />
      </NewsContainer>
      {login.isLogin.type === "admin" && (
        <Common type="new" label="글쓰기" handleClick={handleNewPost} />
      )}
    </>
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

  if (loading) return <Spinner />;

  return (
    <>
      <EventContainer>
        <CardBox type="event" />
      </EventContainer>
      {login.isLogin.type === "admin" && (
        <Common type="new" label="글쓰기" handleClick={handleNewPost} />
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  width: 90rem;
  margin: 3rem auto;
  padding: 1rem;
  gap: 1rem;
  min-height: 30vh;

  @media ${({ theme }) => theme.device.notebookL} {
    width: 64rem;
    flex-direction: column;
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

  @media ${({ theme }) => theme.device.notebookL} {
    flex-direction: row;
    width: 100%;
    height: 5rem;
  }
`;

const StyledLink = styled(Link)`
  ${({ highlight }) =>
    highlight === "true" &&
    css`
      color: ${({ theme }) => theme.color.noticeNav} !important;
      font-weight: bold;
    `}
`;

const EventContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const NewsContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0 auto;
  @media ${({ theme }) => theme.device.mobileL} {
    width: 100%;
  }
`;
