import React from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import {
  KickBoardPost,
  NewsPost,
  EventPost,
  MyKick,
  NoPost,
} from "../../../components";

const cardlist = [
  {
    type: "kickboard",
    component(key, data) {
      return <KickBoardPost key={key} data={data} />;
    },
  },
  {
    type: "news",
    component(key, data) {
      return <NewsPost key={key} data={data} />;
    },
  },
  {
    type: "event",
    component(key, data) {
      return <EventPost key={key} data={data} />;
    },
  },
  {
    type: "mykick",
    component(key, data) {
      return <MyKick key={key} data={data} />;
    },
  },
];

export default function CardBox({ type }) {
  const { component } = cardlist.find((el) => el.type === type);
  let data;
  const list = useSelector((state) => state.board.data);
  const kicklist = useSelector((state) => state.mypage.kick.data);
  if (type === "mykick") data = kicklist;
  else data = list;

  if (!data || data.length === 0) return <NoPost />;

  return <Container>{data.map((el, idx) => component(idx, el))}</Container>;
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width:100%;
  color: ${({ theme }) => theme.color.font};
`;
