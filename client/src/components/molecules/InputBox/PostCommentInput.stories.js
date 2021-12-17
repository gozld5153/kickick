import React from "react";
import PostCommentInput from "./PostCommentInput";

export default {
  title: "molecules/InputBox/PostCommentInput",
  component: PostCommentInput,
  argTypes: {
    size: {
      description: "인풋 크기",
      options: ["sm", "md", "lg"],
      control: { type: "radio" },
    },
  },
};

const Template = (args) => <PostCommentInput {...args} />;

export const Control = Template.bind({});
Control.args = {
  size: "lg",
};
