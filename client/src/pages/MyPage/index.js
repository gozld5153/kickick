import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  MyPageAside,
  Landscape,
  SmallCardBox,
  TabBox,
  ProfileEditForm,
  PostList,
  CardBox,
  Calendar,
  Pagination,
} from "../../components";

import { FaArrowLeft } from "react-icons/fa";

import { getPostsList, getClassifiedPost } from "../../apis/posts";
import { getComments } from "../../apis/comments";
import { getFavorites } from "../../apis/favorites";
import { getLogs } from "../../apis/logs";
import { getKicksList } from "../../apis/kicks";

import {
  getFavoritesAction,
  getMyPostAction,
  getMyCommentAction,
  getKickmoneylogAction,
  getPurchasedKickAction,
} from "../../store/actions/mypage";

import { resetPaginationAction } from "../../store/actions/postsearch";

import { serialAttendacne } from "../../commons/utils/serialAttendance";

import controlicon from "../../assets/images/icon/controlicon.png";
import profileinfoicon from "../../assets/images/icon/profileinfoicon.png";
import activityicon from "../../assets/images//icon/activityicon.png";
import purchaselog from "../../assets/images//icon/purchaselogicon.png";

import {
  PROFILE,
  ATTENDANCE,
  FAVORITES,
  MY_POST,
  MY_COMMENT,
  PURCHASED_KICK,
  KICKMONEY_LOG,
} from "../../commons/constants/mypage";

const pageList = [
  { category: "home", component: <Home /> },
  { category: "profile", component: <Profile />, title: PROFILE },
  { category: "attendance", component: <Attendance />, title: ATTENDANCE },
  { category: "favorites", component: <Favorites />, title: FAVORITES },
  { category: "mypost", component: <MyPost />, title: MY_POST },
  { category: "mycomment", component: <MyComment />, title: MY_COMMENT },
  { category: "kick", component: <PurchasedKick />, title: PURCHASED_KICK },
  { category: "log", component: <KickmoneyLog />, title: KICKMONEY_LOG },
];

export default function MyPage() {
  const dispatch = useDispatch();
  const { category } = useParams();
  const { component, title } = pageList.find((el) => el.category === category);
  const { isLogin } = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(resetPaginationAction());
  }, [category, dispatch]);

  if (!isLogin) return <div>d</div>;
  return (
    <>
      <Landscape />
      <Container>
        <MyPageAside />
        <SubContainer>
          {category !== "home" && <Navigator title={title} />}
          {component}
        </SubContainer>
      </Container>
    </>
  );
}

export function Home() {
  const { isLogin } = useSelector((state) => state.login);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getClassifiedPost()
      .then((data) => {
        setData(data.data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err.response));
  }, []);
  if (loading) return <div>d</div>;
  return (
    <HomeWrapper>
      {isLogin.type === "admin" && (
        <ListContainer>
          <Subtitle>
            <img src={controlicon} alt="" />
            <h2>관리</h2>
          </Subtitle>
          <TabBox category="관리" />
        </ListContainer>
      )}
      <ListContainer>
        <Subtitle>
          <img src={profileinfoicon} alt="" />
          <h2>회원정보</h2>
        </Subtitle>
        <SmallCardBox type="statics" data={data} />
        <TabBox category="회원정보" />
      </ListContainer>
      <ListContainer>
        <Subtitle>
          <img src={activityicon} alt="" />
          <h2>나의활동</h2>
        </Subtitle>
        <TabBox category="나의활동" />
      </ListContainer>
      <ListContainer>
        <Subtitle>
          <img src={purchaselog} alt="" />
          <h2>구매목록</h2>
        </Subtitle>
        <TabBox category="구매목록" />
      </ListContainer>
    </HomeWrapper>
  );
}

export function Profile() {
  return <ProfileEditForm />;
}

export function Attendance() {
  const [loading, setLoading] = useState(true);
  const [serial, setSerial] = useState();
  const [kickmoney, setKickmoney] = useState();

  useEffect(() => {
    getLogs("signin", 30)
      .then((data) => {
        setSerial(serialAttendacne(data.data.data));
        getLogs("kick_money", 30)
          .then((data) => {
            setKickmoney(
              data.data.data
                .find((el) => el.content.slice(0, 3) === "로그인")
                .content.split("_")[1]
                .split(" ")[0]
            );
          })
          .catch((err) => console.log(err));
      })
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }, []);

  if (loading) return <div>d</div>;

  return (
    <AttendanceContainer>
      <SmallCardBox type="attendance" data={{ serial, kickmoney }} />
      <Calendar standardSize="1.5" unit="rem" />
    </AttendanceContainer>
  );
}

export function Favorites() {
  const postsearch = useSelector((state) => state.postsearch);
  const dispatch = useDispatch();

  useEffect(() => {
    getFavorites(null, 10, postsearch.selectPage)
      .then((data) => {
        dispatch(getFavoritesAction(data.data));
      })
      .catch((err) => console.log(err.response));
  }, [postsearch.selectPage, dispatch, postsearch.refresh]);

  return <PostList type="mypagefavorites" />;
}
export function MyPost() {
  const postsearch = useSelector((state) => state.postsearch);
  const dispatch = useDispatch();

  useEffect(() => {
    getPostsList({ page_num: postsearch.selectPage })
      .then((data) => {
        dispatch(getMyPostAction(data.data));
      })
      .catch((err) => console.log(err.response));
  }, [postsearch.selectPage, dispatch]);

  return <PostList type="mypagemypost" />;
}
export function MyComment() {
  const postsearch = useSelector((state) => state.postsearch);
  const dispatch = useDispatch();

  useEffect(() => {
    getComments(null, null, postsearch.selectPage)
      .then((data) => {
        dispatch(getMyCommentAction(data.data));
      })
      .catch((err) => console.log(err.response));
  }, [postsearch.selectPage, dispatch]);

  return <PostList type="mypagemycomment" />;
}

export function PurchasedKick() {
  const postsearch = useSelector((state) => state.postsearch);
  const dispatch = useDispatch();
  const { count } = useSelector((state) => state.mypage.kick);

  useEffect(() => {
    getKicksList(10, postsearch.selectPage)
      .then((data) => {
        dispatch(getPurchasedKickAction(data.data));
      })
      .catch((err) => console.log(err.response));
  }, [postsearch.selectPage, dispatch]);

  return (
    <>
      <CardBox type="mykick" />
      <Pagination count={count} />
    </>
  );
}

export function KickmoneyLog() {
  const postsearch = useSelector((state) => state.postsearch);
  const dispatch = useDispatch();

  useEffect(() => {
    getLogs("kick_money", 10, postsearch.selectPage)
      .then((data) => {
        dispatch(getKickmoneylogAction(data.data));
      })
      .catch((err) => console.log(err.response));
  }, [postsearch.selectPage, dispatch]);

  return <PostList type="mypagelog" />;
}

export function Navigator({ title }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <NavContainer>
      <FaArrowLeft
        onClick={() => {
          navigate(-1);
          dispatch(resetPaginationAction());
        }}
      />
      <h2>{title}</h2>
    </NavContainer>
  );
}

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  svg {
    font-size: 2rem;
    cursor: pointer;
    margin-bottom: 2rem;
  }
`;
const Container = styled.div`
  display: flex;
  gap: 1rem;
  position: relative;
  top: -10rem;
  z-index: 3;

  width: 64rem;
  margin: 0 auto;
  padding: 3rem 1rem;
  background-color: ${({ theme }) => theme.color.back};
  color: ${({ theme }) => theme.color.font};
  border-radius: 0.5rem;

  @media ${({ theme }) => theme.device.notebookS} {
    width: 100%;
    flex-direction: column;
    padding: 1rem;
  }
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;

  width: 77%;
  padding: 2rem;
  border-left: 2px dashed #dddddd;

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
  }
  @media ${({ theme }) => theme.device.notebookS} {
    width: 100%;
    border-top: 2px dashed #dddddd;
    border-left: none;
  }

  @media ${({ theme }) => theme.device.tablet} {
  }
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 4rem;
`;

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 3rem;
`;

const Subtitle = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 3rem;
    height: 3rem;
    margin-right: 0.5rem;
  }
`;

const AttendanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
