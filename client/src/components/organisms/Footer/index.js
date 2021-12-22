import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useSelector,useDispatch } from "react-redux";

import { useScroll } from "../../../hooks/useScroll";
import { FaGithub, FaStream } from "react-icons/fa";
import tree from "../../../assets/images/FooterTree.png";
import moon from "../../../assets/images/footerDark.png";
import { preThemeModeAction } from "../../../store/actions/nav";
import { signOut } from "../../../apis/auth";
import { isLoginAction, isPointAction } from "../../../store/actions/login";

export default function Footer() {
  const scroll = useScroll();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const themeMode = useSelector((state) => state.themeMode);
  const isLogin = useSelector((state)=>state.login)
  const preThemeMode = useSelector((state) => state.persist.preThemeMode);
  const member = [
    {
      name: "HAN TEA GYU",
      github: "https://github.com/snowone4426",
    },
    {
      name: "KIM SEON BIN",
      github: "https://github.com/he2mo",
    },
    {
      name: "SEOK CHANG HWAN",
      github: "https://github.com/Seok-CH",
    },
    {
      name: "HWANG MIN HWAN",
      github: "https://github.com/gozld5153",
    },
  ];
  const categoryList = ["학습", "여가", "생활", "경제", "여행", "예술"];
  const [isOpen, setIsOpen] = useState(window.location.pathname.split("/")[1]);
  const [isMenu, setIsMenu] = useState(false);

  const naviOpener = (name) => {
    setIsMenu(false);
    if (isOpen === name) {
      return setIsOpen("");
    }
    return setIsOpen(name);
  }

  const moveLink = (name) => { 
    navigate(`/${isOpen}/${name}`);
  };

  const themeChanger = () => {
    if (preThemeMode === "light") dispatch(preThemeModeAction("dark"));
    else dispatch(preThemeModeAction("light"));
  };

  const logoutHanlder = () => {
    signOut()
      .then(() => {
        dispatch(isLoginAction(false));
        dispatch(isPointAction(false));
      })
      .then(() => navigate('/', { replace: true }));
  };

  const editMover = (path) => {
    if (categoryList.includes(decodeURI(location.pathname.split("/")[2]))) {
      return navigate(`/write/${path}`, {
        state: { category: decodeURI(location.pathname.split("/")[2]) },
      });
    }
    return navigate(`/write/${path}`);
  };

  return (
    <Container>
      <TreeImg src={tree} alt="tree" />
      <MoonImg src={moon} alt="moon" />
      <ContextContainer
        scroll={scroll.scrollDirection}
        isOpen={isOpen === "board" || isOpen === "kickboard"}
        isMenu={isMenu}
      >
        <Frame>
          <Untouchable>
            <Logo onClick={() => {
              setIsOpen("");
              navigate(`/`);
            }}>KICK</Logo>
            <IntroduceTitle>소개</IntroduceTitle>
            <IntroduceContent>
              괴벽인가,혁신인가 당신의 개성을 드러내세요!
            </IntroduceContent>
            <CopyRight>© 2021 KICK. All rights reserved.</CopyRight>
          </Untouchable>
        </Frame>
        <Frame>
          <FooterNav>
            <FooterNavBtn onClick={() => naviOpener("board")}>
              게시판
              <SpeechBubble isOpen={isOpen === "board"} />
            </FooterNavBtn>
            <FooterNavBtn onClick={() => naviOpener("kickboard")}>
              킥 배우기
              <SpeechBubble isOpen={isOpen === "kickboard"} />
            </FooterNavBtn>
            <FooterNavBtn
              onClick={() => {
                setIsOpen("");
                setIsMenu(!isMenu);
              }}
            >
              <FaStream />
              <MenuContainer isMenu={isMenu}>
                <LoginCheck isLogin={isLogin.isLogin}>
                  <div>{`${isLogin.isPoint} P`}</div>
                </LoginCheck>
                <LoginCheck
                  isLogin={!isLogin.isLogin || isLogin.isLogin.type === "guest"}
                >
                  <div onClick={() => navigate("/login")}>로그인</div>
                  <div onClick={() => navigate("/signup")}>회원가입</div>
                </LoginCheck>
                <div onClick={() => navigate("/intro")}>소개</div>
                <div onClick={() => navigate("/notice/소식")}>공지</div>
                <LoginCheck
                  isLogin={isLogin.isLogin && isLogin.isLogin.type !== "guest"}
                >
                  <div onClick={() => editMover("board")}>게시판 글쓰기</div>
                  <div onClick={() => editMover("kickboard")}>
                    킥 글쓰기
                  </div>
                  <div onClick={() => navigate("/mypage/home")}>마이페이지</div>
                  <div onClick={logoutHanlder}>로그아웃</div>
                </LoginCheck>
                <div onClick={themeChanger}>{`${
                  themeMode[1] === "light" ? "라이트" : "다크"
                } 모드`}</div>
              </MenuContainer>
            </FooterNavBtn>
            <DropdownFooter
              isOpen={isOpen === "board" || isOpen === "kickboard"}
            >
              <DropdownText onClick={() => moveLink("학습")}>학습</DropdownText>
              <DropdownText onClick={() => moveLink("여가")}>여가</DropdownText>
              <DropdownText onClick={() => moveLink("생활")}>생활</DropdownText>
              <DropdownText onClick={() => moveLink("경제")}>경제</DropdownText>
              <DropdownText onClick={() => moveLink("여행")}>여행</DropdownText>
              <DropdownText onClick={() => moveLink("예술")}>예술</DropdownText>
            </DropdownFooter>
          </FooterNav>
          {member.map((el) => (
            <MemberBox
              href={el.github}
              target="_blank"
              rel="noreferrer"
              key={el.name}
            >
              <FaGithub />
              <MemberInfo>{el.name}</MemberInfo>
            </MemberBox>
          ))}
        </Frame>
      </ContextContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media ${({ theme }) => theme.device.tablet} {
    position: fixed;
    bottom: 0;
    z-index: 99999;
  }
`;

const FooterNav = styled.ul`
  display: none;
  @media ${({ theme }) => theme.device.tablet} {
    position: relative;
    display: flex;
    margin-top: ${({ theme }) =>
      `${theme.fontSizes.base.split("rem")[0] * 0.8}rem`};
    font-family: ${({ theme }) => theme.fontFamily.luckiestGuy};
  }

  > :nth-child(3) {
    position: relative;
    top: -${({ theme }) => `${theme.fontSizes.base.split("rem")[0] * 0.15}rem`};
  }
`;

const FooterNavBtn = styled.li`
  display: none;
  @media ${({ theme }) => theme.device.tablet} {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: ${({ theme }) =>
      `${theme.fontSizes.base.split("rem")[0] * 0.5}rem`};
    font-size: ${({ theme }) =>
      `${theme.fontSizes.base.split("rem")[0] * 1.8}rem`};
    font-family: ${({ theme }) => theme.fontFamily.jua};
    color: white;
    white-space: nowrap;
    cursor: pointer;
  }
`;

const SpeechBubble = styled.div`
  display: none;
  @media ${({ theme }) => theme.device.tablet} {
    position: absolute;
    top: 2.3rem;
    left: 2.3rem;
    display: ${({ isOpen }) => isOpen ? "flex" : "none"};
    width: ${({ theme }) => `${theme.fontSizes.base.split("rem")[0] * 1}rem`};
    height: ${({ theme }) => `${theme.fontSizes.base.split("rem")[0] * 1}rem`};
    background-color: white;
    transform: rotate(45deg);
    z-index: 999;
  }
`;

const DropdownFooter = styled.div`
  display: none;
  @media ${({ theme }) => theme.device.tablet} {
    position: absolute;
    top: 3.3rem;
    left: -8rem;
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    justify-content: space-around;
    align-items: center;
    width: ${({ theme }) => `${theme.fontSizes.base.split("rem")[0] * 23}rem`};
    height: ${({ theme }) =>
      `${theme.fontSizes.base.split("rem")[0] * 2.7}rem`};
    border-radius: ${({ theme }) =>
      `${theme.fontSizes.base.split("rem")[0] * 0.5}rem`};
    color: black;
    background-color: white;
    z-index: 9999;
  }
`;

const DropdownText = styled.div`
  @media ${({ theme }) => theme.device.tablet} {
    position: relative;
    top: ${({ theme }) => `${theme.fontSizes.base.split("rem")[0] * 0.3}rem`};
    font-size: ${({ theme }) =>
      `${theme.fontSizes.base.split("rem")[0] * 1.3}rem`};
    cursor: pointer;
  }
`;

const MenuContainer = styled.div`
  position: absolute;
  bottom: 2.5rem;
  right: 0rem;
  display: ${({ isMenu }) => (isMenu ? "flex" : "none")};
  flex-direction: column;
  width: 12rem;
  padding: 0.5rem;
  border-radius: 0.2rem;
  background-color: #444444;
`;

const LoginCheck = styled.div`
  display: ${({ isLogin }) => (isLogin ? "default" : "none")};

  :first-child {
    /* margin-bottom: 1rem; */
    font-size: 1.2rem;
    text-align:end;
  }
`;

const TreeImg = styled.img`
  position: relative;
  top: 0.01rem;
  display: ${({ theme }) => (theme.type === "dark" ? "none" : "default")};
  width: 100vw;
  pointer-events: none;

  @media ${({ theme }) => theme.device.tablet} {
    display:none;
  }
`;

const MoonImg = styled.img`
  position: relative;
  top: 0.01rem;
  display: ${({ theme }) => (theme.type === "light" ? "none" : "default")};
  width: 100vw;
  pointer-events: none;

  @media ${({ theme }) => theme.device.tablet} {
    display: none;
  }
`;

const ContextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: ${({ theme }) => `${theme.fontSizes.base.split("rem")[0] * 17}rem`};
  padding: 0 ${({ theme }) => `${theme.fontSizes.base.split("rem")[0] * 6}rem`};
  color: ${({ theme }) => theme.color.footerFont};
  background-color: ${({ theme }) => theme.color.footerBack};
  overflow: hidden;

  @media ${({ theme }) => theme.device.tablet} {
    position: relative;
    bottom: ${({ isOpen, scroll, isMenu, theme }) =>
      scroll === "down" && !isMenu
        ? `-${theme.fontSizes.base.split("rem")[0] * 7.3}rem`
        : isOpen
        ? 0
        : `-${theme.fontSizes.base.split("rem")[0] * 3.5}rem`};
    align-items: flex-start;
    height: ${({ theme }) => `${theme.fontSizes.base.split("rem")[0] * 8}rem`};
    padding: 0
      ${({ theme }) => `${theme.fontSizes.base.split("rem")[0] * 1}rem`};
    border-radius: ${({ theme }) =>
      `${theme.fontSizes.base.split("rem")[0] * 1}rem ${
        theme.fontSizes.base.split("rem")[0] * 1
      }rem 0 0`};
    background-color: #0c0c42;
    transition: bottom 0.4s;
    overflow: visible;
    z-index: 999;

    :hover {
      bottom: ${({ isOpen, scroll, isMenu, theme }) =>
        scroll === "down" && !isMenu && !isOpen
          ? `-${theme.fontSizes.base.split("rem")[0] * 3.5}rem`
          : isOpen
          ? 0
          : `-${theme.fontSizes.base.split("rem")[0] * 3.5}rem`};
    }
  }
`;

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media ${({ theme }) => theme.device.tablet} {
    align-items: center;
    color: ${({ theme }) => theme.color.back};
  }
`;

const Untouchable = styled.div`
  /* pointer-events: none; */
`;

const Logo = styled.p`
  font-size: ${({ theme }) => `${theme.fontSizes.base.split("rem")[0] * 6}rem`};
  font-family: ${({ theme }) => theme.fontFamily.luckiestGuy};
  cursor: pointer;

  @media ${({ theme }) => theme.device.tablet} {
    position: relative;
    top: ${({ theme }) => `${theme.fontSizes.base.split("rem")[0] * 0.7}rem`};
    color: white;
    font-size: ${({ theme }) =>
      `${theme.fontSizes.base.split("rem")[0] * 4}rem`};
  }
`;

const IntroduceTitle = styled.p`
  padding-bottom: ${({ theme }) =>
    `${theme.fontSizes.base.split("rem")[0] * 0.5}rem`};
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-family: ${({ theme }) => theme.fontFamily.jua};

  @media ${({ theme }) => theme.device.tablet} {
    display: none;
  }
`;

const IntroduceContent = styled(IntroduceTitle)`
  padding-bottom: ${({ theme }) =>
    `${theme.fontSizes.base.split("rem")[0] * 1.5}rem`};
  font-size: ${({ theme }) => theme.fontSizes.xl};

  @media ${({ theme }) => theme.device.tablet} {
    display: none;
  }
`;

const CopyRight = styled.p`
  font-family: ${({ theme }) => theme.fontFamily.jua};

  @media ${({ theme }) => theme.device.tablet} {
    display: none;
  }
`;

const MemberBox = styled.a`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => `${theme.fontSizes.base.split("rem")[0] * 2}rem`};
  color: ${({ theme }) => theme.color.footerFont};

  @media ${({ theme }) => theme.device.tablet} {
    display: none;
  }
`;

const MemberInfo = styled.div`
  position: relative;
  top: ${({ theme }) => `${theme.fontSizes.base.split("rem")[0] * 0.13}rem`};
  margin: ${({ theme }) => `${theme.fontSizes.base.split("rem")[0] * 0.4}rem`};
  font-size: ${({ theme }) =>
    `${theme.fontSizes.base.split("rem")[0] * 1.3}rem`};
  font-family: ${({ theme }) => theme.fontFamily.luckiestGuy};
`;
