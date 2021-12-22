import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import ufo from "../../../assets/images/ufo.png";

export default function NavBtn({
  context = "버튼",
  pathname = "",
  size = "0.9rem",
  color = "",
  fontFamily = `'Jua', sans-serif`,
  backgroundColor,
  func = () => {
    return null;
  },
  isSubNav = false,
  isHover = "",
  setIsHover = () => {
    return null;
  },
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const list = ["학습", "여가", "생활", "경제", "여행", "예술"];
  const noticeList = ["소식", "이벤트"];
  const mylocation = pathname.split("/")[0] === location.pathname.split("/")[1];

  // nav에 있어서 클릭하면 해당 페이지로 이동하는 버튼
  const moveHandler = (path) => {
    navigate(path);
  };
  return (
    <Container
      onMouseEnter={() => setIsHover(pathname)}
      onMouseLeave={() => setIsHover("")}
    >
      <MainBtn
        size={size}
        color={color}
        backgroundColor={backgroundColor}
        fontFamily={fontFamily}
        context={context}
        onClick={() => {
          func();
          moveHandler(pathname);
        }}
      >
        {context}
      </MainBtn>
      <NotNotice
        isSubNav={isSubNav}
        isHover={isHover}
        size={size}
        mylocation={mylocation}
        pathname={pathname}
      >
        {list.map((el, idx) => (
          <SubBtnContainer
            size={size}
            pathname={pathname}
            key={idx}
            onClick={() => moveHandler(`${pathname.split("/")[0]}/${el}`)}
          >
            <SubBtn src={ufo} size={size} alt="ufo" />
            <SubTitle size={size}>{el}</SubTitle>
          </SubBtnContainer>
        ))}
      </NotNotice>
      <NowNotice
        isSubNav={isSubNav}
        isHover={isHover}
        size={size}
        mylocation={mylocation}
        pathname={pathname}
      >
        {noticeList.map((el, idx) => (
          <SubBtnContainer
            size={size}
            pathname={pathname}
            key={idx}
            onClick={() => moveHandler(`${pathname.split("/")[0]}/${el}`)}
          >
            <SubBtn src={ufo} size={size} alt="ufo" />
            <SubTitle size={size} name={el}>
              {el}
            </SubTitle>
          </SubBtnContainer>
        ))}
      </NowNotice>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const MainBtn = styled.div`
  position: relative;
  top: ${({ context, size }) =>
    context === "KICK" ? `${size.replace("rem", "") / 10}rem` : 0};
  /* 로고의 경우 위치가 안맞아서 그떄만 조정되도록 함. */
  margin: 0 0.3rem;
  padding: 0.5rem;
  font-size: ${({ size }) => size};
  font-family: ${({ fontFamily }) => fontFamily};
  color: ${({ color, theme }) => (color ? color : theme.color.font)};
  white-space:nowrap;
  border-radius: ${({ size }) => `${size.replace("rem", "") / 2}rem`};
  background-color: ${({ backgroundColor }) => backgroundColor};
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const SubNav = styled.div`
  position: absolute;
  top: ${({ size }) => `${size.split("rem")[0] * 1.5}rem`};
  align-items: center;
`;

const NotNotice = styled(SubNav)`
  left: ${({ size }) => `-${size.split("rem")[0] * 6}rem`};
  display: ${({ isSubNav, isHover, mylocation, pathname }) =>
    (isSubNav && mylocation && !isHover && pathname !== "notice/소식") ||
    (isSubNav && isHover === pathname && pathname !== "notice/소식")
      ? "flex"
      : "none"};
`;

const NowNotice = styled(SubNav)`
  left: ${({ size }) => `-${size.split("rem")[0] * 1.5}rem`};
  display: ${({ isSubNav, isHover, mylocation, pathname }) =>
    (isSubNav && mylocation && !isHover && pathname === "notice/소식") ||
    (isSubNav && isHover === pathname && pathname === "notice/소식")
      ? "flex"
      : "none"};
`;

const SubBtnContainer = styled.div`
  position: relative;
  top: 0rem;
  height: ${({ size }) => `${size.split("rem")[0] * 2}rem`};
  animation-name: moveDown;
  animation-duration: 0.3s;
  animation-timing-function: ease-out;
  animation-direction: normal;
  animation-iteration-count: 1;

  :nth-child(2) {
    animation-duration: 0.5s;
  }
  :nth-child(3) {
    animation-duration: 0.7s;
  }
  :nth-child(4) {
    animation-duration: 0.9s;
  }
  :nth-child(5) {
    animation-duration: 1.1s;
  }
  :nth-child(6) {
    animation-duration: 1.3s;
  }

  @keyframes moveDown {
    0% {
      top: -10rem;
      pointer-events: none;
    }
    100% {
      top: 0;
      pointer-events: none;
    }
  }
`;

const SubBtn = styled.img`
  height: ${({ size }) => `${size.split("rem")[0] * 2}rem`};
`;

const SubTitle = styled.span`
  position: absolute;
  top: ${({ size, name }) =>
    name === "이벤트"
      ? `${size.split("rem")[0] * 0.8}rem`
      : `${size.split("rem")[0] * 0.65}rem`};
  left: ${({ size, name }) =>
    name === "이벤트"
      ? `${size.split("rem")[0] * 0.6}rem`
      : `${size.split("rem")[0] * 0.65}rem`};
  font-size: ${({ size, name }) =>
    name === "이벤트" ? `${size.split("rem")[0] * 0.7}rem` : "1rem"};
  font-family: ${({ theme }) => theme.fontFamily.jua};
  white-space: nowrap;
`;
