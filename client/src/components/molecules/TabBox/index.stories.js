import React from "react";

import TabBox from "./";

export default {
  title: "Molecules/TabBox",
  component: TabBox,
};

const Template = (args) => <TabBox {...args} />;

export const Control = Template.bind({});
Control.args = {
  list: [
    "회원정보",
    "즐겨찾기",
    "내가 올린 글",
    "내가 단 댓글",
    "킥 구매 목록",
    "킥머니 로그",
    "이벤트 당첨 목록",
  ],
};
