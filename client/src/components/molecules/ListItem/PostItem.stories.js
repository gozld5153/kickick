import React from "react";
import PostItem from "./PostItem";

export default {
  title: "molecules/Comment/PostItem",
  component: PostItem,
  argTypes: {},
};

const Template = (args) => <PostItem {...args} />;

export const Control = Template.bind({});
Control.args = {};
