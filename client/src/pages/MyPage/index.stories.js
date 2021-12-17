import React from "react";
import MyPage from "./";

export default {
  title: "PAGES/MyPage",
  component: MyPage,
};

const Template = (args) => <MyPage {...args} />;

export const Control = Template.bind({});
