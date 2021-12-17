import React from "react";
import NavBtn from "./NavBtn";

export default {
  title: "atoms/Button/NavBtn",
  component: NavBtn,
  // argTypes: {
  //   size: {
  //     description: "인풋 크기",
  //     control: { type: "radio" },
  //   },
  // },
};

const Template = (args) => <NavBtn {...args} />;

export const Control = Template.bind({});
Control.args = {
  label: "NavBtn",
};
