import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";

import { NavBtn, AlarmBtn, BtnChamber } from "../../../components";
import { signOut } from "../../../apis/auth";
import { useScroll } from "../../../hooks/useScroll";
import { isLoginAction, isPointAction } from "../../../store/actions/login";
import { preThemeModeAction } from "../../../store/actions/nav";

import sun from "../../../assets/images/sun.png";
import moon from "../../../assets/images/moon.png";

export default function Nav({ socketClient }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const scroll = useScroll();
  const isLogin = useSelector((state) => state.login.isLogin);
  const preThemeMode = useSelector((state) => state.persist.preThemeMode);
  const themeMode = useSelector((state) => state.themeMode);
  const userPoint = useSelector((state) => state.login.isPoint);
  const socketChange = useSelector((state) => state.socket);
  const themeImg = [sun, moon];
  const [isHover, setIsHover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const categoryList = ["학습","여가","생활","경제","여행","예술"]

  const logoutHanlder = () => {
    signOut().then(() => {
      dispatch(isLoginAction(false));
      dispatch(isPointAction(false));
    });
  };

  const themeChanger = () => {
    if (preThemeMode === "light") dispatch(preThemeModeAction("dark"));
    else dispatch(preThemeModeAction("light"));
  };

  const editMover = (path) => {
    if (categoryList.includes(decodeURI(location.pathname.split("/")[2]))) {
      return navigate(`/write/${path}`, {
        state: { category: decodeURI(location.pathname.split("/")[2]) },
      });
    }
    return navigate(`/write/${path}`);
  }

  useEffect(() => {
    // console.log("작동했음");
    if (isLogin && socketChange.targetId) {
      // console.log("전송했음", socketChange.targetId);
      socketClient.emit("alarms", {
        username: socketChange.targetId,
        ...socketChange.alarmPage,
      });
    }
    if (isLogin && (socketChange.notice || socketChange.event)) {
      socketClient.emit("broadcast", {});
    }
    return () => {
      socketClient.disconnect();
    };
  }, [socketChange, isLogin]);


  return (
    <Container
      scroll={scroll}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Frame scroll={scroll} isHover={isHover}>
        <Separation>
          <NavBtn
            context="KICK"
            size="3rem"
            fontFamily={`'Luckiest Guy', cursive`}
            pathname="/"
          />
          <BtnChamber />
        </Separation>
        <Separation>
          <ThemeBtn
            src={themeMode[1] === "light" ? themeImg[0] : themeImg[1]}
            onClick={themeChanger}
            alt="themeBtn"
          />
          <LoginChanger isLogin={userPoint !== false}>
            <Point>{`${userPoint} P`}</Point>
          </LoginChanger>
          <LoginChanger isLogin={isLogin === false || isLogin.type === "guest"}>
            <NavBtn context="로그인" pathname="/login" />
            <NavBtn
              context="회원가입"
              pathname="/signup"
              color="#ffffff"
              backgroundColor="#350480"
            />
          </LoginChanger>
          <LoginChanger isLogin={isLogin && isLogin.type !== "guest"}>
            <AlarmBtn socketClient={socketClient} />
            <EditBoardContainer>
              <EditBoard onClick={() => setIsOpen(!isOpen)}>글쓰기</EditBoard>
              <Arrow isOpen={isOpen} />
              <DropdownContainer
                isOpen={isOpen}
                onMouseLeave={() => setIsOpen(false)}
              >
                <DropdownList onClick={() => editMover("board")}>
                  게시판
                </DropdownList>
                <DropdownList onClick={() => editMover("kickboard")}>
                  킥 게시판
                </DropdownList>
                <DropdownList
                  onClick={() => editMover("notice")}
                  loginType={isLogin.type}
                >
                  소식
                </DropdownList>
                <DropdownList
                  onClick={() => editMover("notice")}
                  loginType={isLogin.type}
                >
                  이벤트
                </DropdownList>
              </DropdownContainer>
            </EditBoardContainer>
            <NavBtn context="마이페이지" pathname="/mypage/home" />
            <NavBtn
              context="로그아웃"
              pathname="/"
              color="#ffffff"
              func={logoutHanlder}
              backgroundColor="#350480"
            />
          </LoginChanger>
        </Separation>
      </Frame>
    </Container>
  );
}

const Point = styled.div`
  margin: 0.2rem;
  color: ${({ theme }) => theme.color.font};
  font-family: ${({ theme }) => theme.fontFamily.jua};
  white-space: nowrap;
`;

const VerticalAlign = styled.div`
  display: flex;
  align-items: center;
`;

const Container = styled(VerticalAlign)`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 4rem;
  background-color: transparent;
  z-index: 999;

  @media ${({ theme }) => theme.device.tablet} {
    display: none;
  }
`;

const Frame = styled(VerticalAlign)`
  position: relative;
  top: ${({ scroll, isHover }) =>
    scroll.scrollDirection === "up" && !isHover && window.pageYOffset !== 0
      ? "-8rem"
      : 0};
  justify-content: space-between;
  width: 100vw;
  height: 4rem;
  background-color: ${({ theme }) => theme.color.back};
  transition: top 1s;
`;

const Separation = styled(VerticalAlign)`
  :first-child {
    margin-left: 1rem;
  }
  :last-child {
    margin-right: 1rem;
  }
`;

const LoginChanger = styled.div`
  display: ${({ isLogin }) => (isLogin ? "flex" : "none")};
`;

const ThemeBtn = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  margin-right: 0.3rem;
  border-radius: 3rem;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const EditBoardContainer = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`;

const EditBoard = styled.div`
  margin: 0 0.3rem;
  padding: 0.2rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-family: "Jua", sans-serif;
  color: ${({ theme }) => theme.color.font};
  white-space: nowrap;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;
const Arrow = styled.div`
  position: absolute;
  top: 2.8rem;
  display:${ ({isOpen})=> isOpen ? "default": "none"};
  width: 1rem;
  height: 1rem;
  transform: rotate(45deg);
  background-color: ${({ theme }) => theme.color.alarm};
`;

const DropdownContainer = styled.ul`
  position: absolute;
  top: 3.3rem;
  display: ${({ isOpen }) => (isOpen ? "default" : "none")};
  padding: 0.2rem 0.7rem;
  color: white;
  background-color: ${({ theme }) => theme.color.alarm};
`;

const DropdownList = styled.li`
  display: ${({ loginType }) => !loginType || loginType === "admin" ? "default" : "none"};
  margin: 0.5rem 0;
  font-size: 1.5rem;
  font-family: "Jua", sans-serif;
  cursor:pointer;

  :hover {
    opacity: 0.8;
  }
`;