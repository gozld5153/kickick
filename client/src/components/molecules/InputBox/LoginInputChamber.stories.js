import React from "react";
import LoginInputChamber from "./LoginInputChamber";

export default {
  title: "molecules/InputBox/LoginInputChamber",
  component: LoginInputChamber,
  // argTypes: {
  //   size: {
  //     description: "인풋 크기",
  //     control: { type: "radio" },
  //   },
  // },
};

const Template = (args) => <LoginInputChamber {...args} />;

export const Control = Template.bind({});
Control.args = {
  label: "LoginInputChamber",
};
