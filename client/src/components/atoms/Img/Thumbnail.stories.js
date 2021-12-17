import React from "react";
import Thumbnail from "./Thumbnail";

export default {
  title: "atoms/Img/Thumbnail",
  component: Thumbnail,
  argTypes: {
    thumbnailType: {
      description: "프로필 크기 기준",
      options: ["notice", "post", "confirm"],
      control: { type: "radio" },
    },
    size: {
      description: "화면 크기",
      options: ["sm", "md", "lg"],
      control: { type: "radio" },
    },
  },
};

const Template = (args) => <Thumbnail {...args} />;

export const Control = Template.bind({});
Control.args = {
  thumbnailType: "notice",
  size: "lg",
};
