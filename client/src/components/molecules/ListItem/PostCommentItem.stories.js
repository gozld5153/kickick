import React from "react";
import PostCommentItem from "./PostCommentItem";

export default {
  title: "molecules/Comment/PostCommentItem",
  component: PostCommentItem,
  argTypes: {
    size: {
      description: "인풋 크기",
      options: ["sm", "md", "lg"],
      control: { type: "radio" },
    },
  },
};

const Template = (args) => <PostCommentItem {...args} />;

export const Control = Template.bind({});
Control.args = {
  size: "lg",
};
