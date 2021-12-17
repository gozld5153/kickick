import React from "react";
import NewsPost from "./NewsPost";

export default {
  title: "molecules/Card/NewsPost",
  component: NewsPost,
  argTypes: {},
};

const Template = (args) => <NewsPost {...args} />;

export const Control = Template.bind({});
Control.args = {};
