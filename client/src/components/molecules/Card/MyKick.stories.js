import React from "react";
import MyKick from "./MyKick";

export default {
  title: "molecules/Card/MyKick",
  component: MyKick,
  argTypes: {},
};

const Template = (args) => <MyKick {...args} />;

export const Control = Template.bind({});
Control.args = {};
