import React from "react";
import PostStatics from "./PostStatics";

export default {
  title: "molecules/Card/PostStatics",
  component: PostStatics,
  argTypes: {},
};

const Template = (args) => <PostStatics {...args} />;

export const Control = Template.bind({});
Control.args = {};
