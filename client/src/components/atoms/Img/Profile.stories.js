import React from "react";
import Profile from "./Profile";

export default {
  title: "atoms/Img/Profile",
  component: Profile,
  argTypes: {
    type: {
      description: "프로필 크기 기준",
      options: ["comment", "post", "mypage"],
      control: { type: "radio" },
    },
  },
};

const Template = (args) => <Profile {...args} />;

export const Control = Template.bind({});
Control.args = {
  type: "comment",
  size: "lg",
};
