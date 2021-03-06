import React, { useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";

import { Nav, Footer, PageUp, CommonModal } from "./components";
import Main from "./pages/Main";
import Intro from "./pages/Intro"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MailAuth from "./pages/Signup/MailAuth";
import Board from "./pages/Board/Board";
import KickBoard from "./pages/KickBoard";
import Notice from "./pages/Notice";
import DetailBoard from "./pages/Post/DetailBoard";
import DetailKickBoard from "./pages/Post/DetailKickBoard";
import DetailNotice from "./pages/Post/DetailNotice";
import EditBoard from "./pages/Write/EditBoard";
import MyEditBoard from "./pages/Write/MyEditBoard";
import EditKickBoard from "./pages/Write/EditKickBoard";
import EditNotice from "./pages/Write/EditNotice";
import Write from "./pages/Write";
import Error from "./pages/Error/Page404";
import KakaoAuth from "./pages/Login/KakaoAuth";
import NaverAuth from "./pages/Login/NaverAuth";
import GoogleAuth from "./pages/Login/GoogleAuth";
import MyPage from "./pages/MyPage";
import {
  Home,
  Profile,
  Attendance,
  Favorites,
  MyPost,
  MyComment,
  PurchasedKick,
  KickmoneyLog,
} from "./pages/MyPage";

import { light, dark } from "./commons/styles/theme";
import { nowImLogin } from "./apis/auth";
import {
  isLoginAction,
  todayLoginAction,
  isPointAction,
} from "./store/actions/login";
import { alarmListAction, themeModeAction } from "./store/actions/nav";
import lightToDark from "./assets/images/lightToDark.png";
import darkToLight from "./assets/images/darkToLight.png";

export default function App() {
  const dispatch = useDispatch();
  const socketClient = io(`${process.env.REACT_APP_API_URL}`);
  const isLogin = useSelector((state) => state.login.isLogin);
  const todayLogin = useSelector((state) => state.login.todayLogin);
  const preThemeMode = useSelector((state) => state.persist.preThemeMode);
  const themeMode = useSelector((state) => state.themeMode);
  const socketChange = useSelector((state) => state.socket);
  const list = ["??????", "??????", "??????", "??????", "??????", "??????"];

  useEffect(() => {
    setTimeout(() => {
      if (preThemeMode === "light") {
        dispatch(themeModeAction([light, "light"]));
      } else {
        dispatch(themeModeAction([dark, "dark"]));
      }
    }, 580);

    nowImLogin(todayLogin)
      .then((res) => {
        const loginData = { ...res.data.data };
        delete loginData.kick_money;
        dispatch(isLoginAction(loginData));
        dispatch(isPointAction(res.data.data.kick_money));
        if (!todayLogin) dispatch(todayLoginAction(true));
        return res.data.message;
      })
      .then((message) =>
        message === "first login"
          ? window.location.replace(`/modal/calendar`)
          : null
      )
      .catch(() => dispatch(isLoginAction(false)));
  }, [preThemeMode]);

  if (isLogin) {
    socketClient.on("connect", () => {
      // console.log("connection server");

      socketClient.emit("signin", {
        username: isLogin.username,
        ...socketChange.alarmPage,
      });

      socketClient.on("alarms", (data) => {
        // console.log("?????????", data);
        dispatch(alarmListAction(data));
      });

      socketClient.on("broadcast", () => {
        // console.log("??????????????????");
        socketClient.emit("alarms", {
          username: isLogin.username,
          ...socketChange.alarmPage,
        });
      });

      socketClient.on("disconnect", () => {
        // console.log("disconnection");
      });

      socketClient.emit("alarms", {
        username: isLogin.username,
        ...socketChange.alarmPage,
      });
    });
  }
  return (
    <ThemeProvider theme={themeMode[0]}>
      <Router>
        <Container>
          <PageUp />
          {preThemeMode === "light" ? (
            <LightChanger preThemeMode={preThemeMode}>
              <DarkBox />
              <Theme src={darkToLight} />
            </LightChanger>
          ) : (
            <DarkChanger preThemeMode={preThemeMode}>
              <Theme src={lightToDark} />
              <DarkBox />
            </DarkChanger>
          )}
          <Nav socketClient={socketClient} />
          <Routes>
            <Route path="/" element={<Main />}>
              <Route path="kakao" element={<KakaoAuth />} />
              <Route path="naver" element={<NaverAuth />} />
              <Route path="google" element={<GoogleAuth />} />
              <Route path="modal/:modal" element={<CommonModal />} />
            </Route>
            <Route path="/intro" element={<Intro />} />
            <Route path="login" element={<Login />} />
            {/* <Route path="signup" element={<SignupSelect />} /> */}
            <Route path="signup" element={<Signup />} />
            <Route path="mailauth/:username" element={<MailAuth />} />
            <Route
              path="board/:category"
              element={<Board themeCode={themeMode[1]} list={list} />}
            />
            <Route
              path="detailboard/:post_id"
              element={<DetailBoard themeCode={themeMode[1]} />}
            />
            <Route
              path="editboard/:category"
              element={<EditBoard themeCode={themeMode[1]} list={list} />}
            />
            <Route
              path="myeditboard/:category/:post_id"
              element={<MyEditBoard themeCode={themeMode[1]} list={list} />}
            />
            <Route
              path="kickboard/:category"
              element={<KickBoard themeCode={themeMode[1]} />}
            />
            <Route
              path="detailkick/:kick_id"
              element={<DetailKickBoard themeCode={themeMode[1]} />}
            />
            <Route
              path="editkick/:category"
              element={<EditKickBoard themeCode={themeMode[1]} />}
            />
            <Route path="mypage" element={<Navigate to="/mypage/home" />} />
            <Route path="mypage" element={<MyPage />}>
              <Route path="home" element={<Home />} />
              <Route path="profile" element={<Profile />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="mypost" element={<MyPost />} />
              <Route path="mycomment" element={<MyComment />} />
              <Route path="kick" element={<PurchasedKick />} />
              <Route path="log" element={<KickmoneyLog />} />
            </Route>
            <Route
              path="notice/:category"
              element={<Notice themeCode={themeMode[1]} />}
            >
              <Route
                path=":notice_id"
                element={<DetailNotice themeCode={themeMode[1]} />}
              />
            </Route>
            <Route path="notice/:category/edit" element={<EditNotice />} />
            <Route path="write" element={<Write />}>
              <Route
                path="board"
                element={<EditBoard themeCode={themeMode[1]} list={list} />}
              />
              <Route
                path="kickboard"
                element={<EditKickBoard themeCode={themeMode[1]} />}
              />
              <Route path="notice" element={<EditNotice />} />
            </Route>
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer />
        </Container>
      </Router>
    </ThemeProvider>
  );
}

const Container = styled.div`
  position: relative;
  width: 100vw;
  min-height: 100vh;
  padding-top: 4rem;
  background-color: ${({ theme }) => theme.color.back};

  @media ${({ theme }) => theme.device.tablet} {
    padding-top: 0rem;
    padding-bottom: 7rem;
  }
`;

  const Theme = styled.img`
    position: relative;
    height: 100vh;
    margin: 0 -1rem;
  `;

const DarkBox = styled.div`
  position: relative;
  width: 110vw;
  height: 100vh;
  background-color: black;
`;

const ModeChanger = styled.div`
  position: fixed;
  top: 0rem;
  right: 100vw;
  display: flex;
  z-index: 99999;
  animation-name: slide;
  animation-direction: normal;
  animation-iteration-count: 1;

  @keyframes slide {
    0% {
      right: -210vw;
    }
    100% {
      right: 100vw;
    }
  }
`;

const LightChanger = styled(ModeChanger)`
  animation-duration: 2s;
  z-index: 99999999;
`;

const DarkChanger = styled(ModeChanger)`
  animation-duration: 2.2s;
  z-index: 99999999;
`;
