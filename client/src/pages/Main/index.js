import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import {
  MainMiniNav,
  MainNotice,
  MainRecommend,
  MainEvent,
} from "../../components";
import { getNoticesInfo, getNoticesList } from "../../apis/notices"
import { recommendedPost } from "../../apis/posts";
import { firstEnterCheck } from "../../apis/cookie"
import { getListAction } from "../../store/actions/postlist";

export default function Main() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [kickListInfo, setKickList] = useState({});
  const [noticeInfo, setNoticeInfo] = useState({})
  const [eventInfo, setEventInfo] = useState([])
  const [kickListLoding, setKickListLoding] = useState(false);
  const [noticeLoding, setNoticeLoding] = useState(false);
  const [eventLoding, setEventLoding] = useState(false);

  const isLoding = noticeLoding && eventLoding && kickListLoding;

  useEffect(() => {
    // 첫방문인지 체크하고 첫 방문이면 이동
    firstEnterCheck().then((res) => {
      console.log(res.data.data);
      if (!res.data.data.token && !Object.keys(res.data.data).includes("is_visited")) {
        navigate("/modal/firstenter");
      }
    }).catch((err) => {
      if (err.data && err.data.message === "쿠키가 존재하지 않습니다.") {
        navigate("/modal/firstenter");
      }
    });
    // 킥 추천 불러오기
    recommendedPost()
      .then((res) => setKickList(res.data.data))
      .then(() => setKickListLoding(true));
    // 가장 최신 공지 하나 불러오기
    getNoticesList({ type: "notices", limit: 1, page_num: 1 }).then((res) => {
      console.log(res.data.data);
      getNoticesInfo(res.data.data[0].notice_id)
        .then((res) => setNoticeInfo(res.data.data))
        .then(() => setNoticeLoding(true));
    });
    // 이벤트 리스트 불러오기
    getNoticesList({ type: "events", limit: 4, page_num:1 })
      .then((res) => {
        setEventInfo([...res.data.data]);
        dispatch(getListAction(res.data));
      })
      .then(() => setEventLoding(true));
  }, []);
  
  // console.log("isLoding", isLoding);
  return (
    <Container>
      <ContentSection>
        <MainMiniNav />
        <MainRecommend kickListInfo={kickListInfo} />
      </ContentSection>
      <ContentSection>
        <Title>킥소식!</Title>
        <ContextContainer>
          <MainNotice noticeInfo={noticeInfo} />
        </ContextContainer>
      </ContentSection>
      <ContentSection>
        <Title>킥이벤트</Title>
        <ContextContainer>
          <MainEvent eventInfo={eventInfo} />
        </ContextContainer>
      </ContentSection>
      <Outlet />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display:flex;
  flex-direction:column;
  align-items:center;
  width: 100vw;
  max-width: 100%;
  min-height: 79vh;
  padding: 0 5vw;
`;

const ContentSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80vw;
  margin: 1vw 0;
`;

const Title = styled.p`
  align-self: flex-start;
  font-size: 2vw;
  font-family: ${({ theme }) => theme.fontFamily.jua};
  color: ${({ theme }) => theme.color.font};
`;

const ContextContainer = styled.article`
  display: flex;
  width: 80vw;
`;