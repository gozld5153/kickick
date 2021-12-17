import React from "react";
import CommentTextarea from "./CommentTextarea";

export default {
  title: "atoms/CommentTextarea",
  component: CommentTextarea,
  argTypes: {
    size: {
      description: "인풋 크기",
      options: ["sm", "md", "lg"],
      control: { type: "radio" },
    },
  },
};

const Template = (args) => <CommentTextarea {...args} />;

export const Control = Template.bind({});
Control.args = {
  size: "lg",
};
