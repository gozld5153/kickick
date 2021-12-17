import React from "react";
import styled from "styled-components";

import { FaGithub } from "react-icons/fa";
import tree from "../../../assets/images/FooterTree.png";

export default function Footer() {
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
  return (
    <Container>
      <TreeImg src={tree} alt="tree" />
      <ContextContainer>
        <Frame>
          <Untouchable>
            <Logo>KICK</Logo>
            <IntroduceTitle>소개</IntroduceTitle>
            <IntroduceContent>
              괴벽인가,혁신인가 당신의 개성을 드러내세요!
            </IntroduceContent>
            <CopyRight>© 2021 KICK. All rights reserved.</CopyRight>
          </Untouchable>
        </Frame>
        <Frame>
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
`;

const TreeImg = styled.img`
  position: relative;
  top: 0.01rem;
  display:${({theme})=> theme.type === "dark" ? "none":"default"};
  width: 100vw;
  pointer-events: none;
`;

const ContextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${({ theme }) => `${theme.fontSizes.base.split("rem")[0] * 17}rem`};
  padding: 0 ${({ theme }) => `${theme.fontSizes.base.split("rem")[0] * 6}rem`};
  color: ${({ theme }) => theme.color.footerFont};
  background-color: ${({ theme }) => theme.color.footerBack};
  overflow: hidden;
`;

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Untouchable = styled.div`
  pointer-events: none;
`;

const Logo = styled.p`
  font-size: ${({ theme }) => `${theme.fontSizes.base.split("rem")[0] * 6}rem`};
  font-family: ${({ theme }) => theme.fontFamily.luckiestGuy};
`;

const IntroduceTitle = styled.p`
  padding-bottom: ${({ theme }) =>
    `${theme.fontSizes.base.split("rem")[0] * 0.5}rem`};
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-family: ${({ theme }) => theme.fontFamily.jua};
`;

const IntroduceContent = styled(IntroduceTitle)`
  padding-bottom: ${({ theme }) =>
    `${theme.fontSizes.base.split("rem")[0] * 1.5}rem`};
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const CopyRight = styled.p`
  font-family: ${({ theme }) => theme.fontFamily.jua};
`;

const MemberBox = styled.a`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => `${theme.fontSizes.base.split("rem")[0] * 2}rem`};
  color: ${({ theme }) => theme.color.footerFont};
`;

const MemberInfo = styled.div`
  position: relative;
  top: ${({ theme }) => `${theme.fontSizes.base.split("rem")[0] * 0.13}rem`};
  margin: ${({ theme }) => `${theme.fontSizes.base.split("rem")[0] * 0.4}rem`};
  font-size: ${({ theme }) =>
    `${theme.fontSizes.base.split("rem")[0] * 1.3}rem`};
  font-family: ${({ theme }) => theme.fontFamily.luckiestGuy};
`;
