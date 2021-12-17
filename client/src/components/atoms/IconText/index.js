import React from "react";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";
import {
  FaHashtag,
  FaUserAstronaut,
  FaAlignJustify,
  FaRegClock,
  FaFireAlt,
  FaRegEdit,
  FaRegCalendarAlt,
  FaRegBookmark,
  FaRegComment,
  FaRegClipboard,
  FaRegHeart,
  FaDollarSign,
  FaRegWindowClose,
  FaBirthdayCake,
  FaStar,
  FaArrowDown,
  FaArrowUp,
} from "react-icons/fa";

import { ImGift } from "react-icons/im";
import { AiOutlineMail } from "react-icons/ai";
import { VscMegaphone } from "react-icons/vsc";
import { FiUserCheck } from "react-icons/fi";
import { BsBell } from "react-icons/bs";

export const iconList = [
  { icon: <FaAlignJustify />, label: "제목", category: "검색" },
  { icon: <FaUserAstronaut />, label: "글쓴이", category: "검색" },
  { icon: <FaHashtag />, label: "태그", category: "검색" },
  { icon: <FaRegClock />, label: "최신", category: "정렬", color: "skyblue" },
  { icon: <FaFireAlt />, label: "인기", category: "정렬", color: "red" },
  { icon: <FaRegEdit />, label: "회원정보 수정", category: "마이페이지" },
  { icon: <FaRegCalendarAlt />, label: "출석", category: "마이페이지" },
  { icon: <FaRegHeart />, label: "좋아요 한 글", category: "마이페이지" },
  { icon: <FaRegClipboard />, label: "내가 쓴 글", category: "마이페이지" },
  { icon: <FaRegComment />, label: "내가 단 댓글", category: "마이페이지" },
  { icon: <FaRegBookmark />, label: "내가 산 킥", category: "마이페이지" },
  { icon: <FaDollarSign />, label: "킥머니 로그", category: "마이페이지" },
  { icon: <FiUserCheck />, label: "유저관리", category: "마이페이지" },
  { icon: <VscMegaphone />, label: "게시글 신고 목록", category: "마이페이지" },
  { icon: <BsBell />, label: "공지 적기", category: "마이페이지" },
  { icon: <FaArrowDown />, label: "통계보기", category: "드롭다운" },
  { icon: <FaArrowUp />, label: "닫기", category: "드롭다운" },
  { icon: <FaBirthdayCake />, label: "생일", category: "유저" },
  { icon: <AiOutlineMail />, label: "이메일", category: "유저" },
  { icon: <ImGift />, label: "진행중인 이벤트", category: "이벤트" },
  { icon: <FaRegWindowClose />, label: "완료한 이벤트", category: "이벤트" },
  { icon: <VscMegaphone />, label: "뉴스", category: "공지" },
  { icon: <ImGift />, label: "이벤트", category: "공지" },
  { icon: <FaStar />, label: "구매함", category: "킥보드" },
];

export default function IconText({ label, handleClick, board }) {
  const { icon, color, category } = iconList.find((i) => i.label === label);
  const { align } = useSelector((state) => state.postsearch);

  return (
    <Container
      onClick={handleClick}
      isActive={align === label}
      color={color}
      category={category}
      board={board}
    >
      {category === "공지" ? (
        <>
          {label}
          {icon}
        </>
      ) : (
        <>
          {icon}
          {label}
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: bold;

  svg {
    margin-right: 0.5rem;
    font-size: 1.1rem;
    pointer-events: none;
  }

  ${({ category }) =>
    category === "정렬" &&
    css`
      margin: 0 0.5rem;
      border-bottom: 3px solid
        ${({ isActive, color }) => (isActive ? color : "transparent")};
      font-size: 1.3rem;
      color: ${({ isActive, color }) => (isActive ? color : "#cccccc")};
      transition: all 0.2s ease-out;
      cursor: pointer;
      svg {
        font-size: 1.5rem;
      }
    `}

  ${({ category }) =>
    category === "검색" &&
    css`
      font-size: 1rem;
      cursor: pointer;

      svg {
        font-size: 1.1rem;
      }
    `}

    ${({ category, board }) =>
    category === "게시판" &&
    board &&
    css`
      font-size: 2rem;
      svg {
        font-size: 2.5rem;
      }
    `}

    ${({ category }) =>
    category === "마이페이지" &&
    css`
      font-size: 1rem;
      font-weight: normal;

      svg {
        margin-right: 1rem;
        font-size: 1.5rem;
        color: ${({ theme }) => theme.color.mypageSvg};
      }
    `}

    ${({ category }) =>
    category === "유저" &&
    css`
      font-size: 0.9rem;
      font-weight: normal;

      svg {
        margin-right: 0.2rem;
        font-size: 1rem;
        color: #555;
      }
    `}


    ${({ category }) =>
    category === "공지" &&
    css`
      font-size: 1.2rem;

      svg {
        margin-left: 0.3rem;
        font-size: 1rem;
      }
    `}

    ${({ category }) =>
    category === "킥보드" &&
    css`
      font-size: 0.8rem;
      color: #f0bb62;
      border: 2px solid #f0bb62;
      background: #fff;
      border-radius: 0.5rem;
      padding: 0.3rem;
      svg {
        margin-left: 0.3rem;
        font-size: 1rem;
      }
    `}

    ${({ category }) =>
    category === "드롭다운" &&
    css`
      color: gray;
      margin-left: auto;
      font-weight: bold;
      cursor: pointer;
      width: 6rem;
      font-size: 0.8rem;
      &:hover {
        color: black;
      }
      svg {
        margin-left: 0.3rem;
        font-size: 0.9rem;
      }
    `}
`;
