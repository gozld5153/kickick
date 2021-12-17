import React from "react";
import styled, { css } from "styled-components";

import {
  FaArrowLeft,
  FaRegHeart,
  FaRegEdit,
  FaRegEye,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
  FaHeart,
  FaTimes,
  FaTrashAlt,
} from "react-icons/fa";

const iconList = [
  {
    label: "cmtDel",
    icon: <FaTrashAlt />,
    color: "#a8a8a8",
    category: "comments",
  },
  { label: "postDel", icon: <FaTimes />, color: "red", category: "postNav" },
  {
    label: "arrow",
    icon: <FaArrowLeft />,
    color: "#c4c4c4",
    category: "postNav",
  },
  { label: "red", icon: <FaHeart />, color: "#FFAFAF", category: "postNav" },
  {
    label: "heart",
    icon: <FaRegHeart />,
    color: "#FFAFAF",
    category: "postNav",
  },
  { label: "edit", icon: <FaRegEdit />, color: "#396EB0", category: "postNav" },

  {
    label: "count",
    icon: <FaRegEye />,
    color: "#000000",
    category: "postInfo",
  },
  {
    label: "doubleleft",
    icon: <FaAngleDoubleLeft />,
    color: "#000000",
    category: "pagination",
  },
  {
    label: "doubleright",
    icon: <FaAngleDoubleRight />,
    color: "#000000",
    category: "pagination",
  },
  {
    label: "left",
    icon: <FaAngleLeft />,
    color: "#000000",
    category: "pagination",
  },
  {
    label: "right",
    icon: <FaAngleRight />,
    color: "#000000",
    category: "pagination",
  },
];

export default function IconBox({ label = "arrow", handleClick, themeCode }) {
  const { icon, color, category } = iconList.find((el) => el.label === label);

  return (
    <Container
      label={label}
      color={color}
      onClick={category === "postInfo" ? null : () => handleClick(label)}
      category={category}
      themeCode={themeCode}
    >
      {icon}
    </Container>
  );
}

const Container = styled.div`
  width: 2rem;
  height: 2rem;
  padding: 0.5rem;
  text-align: center;
  cursor: pointer;

  ${({ category }) =>
    category === "postInfo" &&
    css`
      cursor: default;
    `}

  ${({ category, color }) =>
    category === "postNav" &&
    css`
      width: 2.5rem;
      height: 2.5rem;
      border: 1px solid ${color};
      color: ${color};
      border-radius: 10px;
      svg {
        font-size: 1.5rem;
      }
    `}

  ${({ label }) =>
    label === "arrow" &&
    css`
      :hover {
        color: #fff;
        background-color: ${({ theme }) => theme.color.hoverArrow};
      }
    `}
    
  ${({ label }) =>
    label === "edit" &&
    css`
      box-shadow: inset
        ${({ themeCode }) =>
          themeCode === "dark" ? "0 0 1rem rgba(39, 60, 86, 1)" : null};
    `}
  
  ${({ label }) =>
    label === "postDel" &&
    css`
      box-shadow: inset
        ${({ themeCode }) =>
          themeCode === "dark" ? "0 0 1rem rgba(255, 0, 0, 1)" : null};
    `}

  ${({ label }) =>
    (label === "red" || label === "heart") &&
    css`
      box-shadow: inset
        ${({ themeCode }) =>
          themeCode === "dark" ? "0 0 1rem rgba(255,175,175, 1)" : null};
    `}
`;
