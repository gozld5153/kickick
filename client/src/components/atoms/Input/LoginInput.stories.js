import React from "react";
import LoginInput from "./LoginInput";

export default {
  title: "atoms/Input/LoginInput",
  component: LoginInput,
  // argTypes: {
  //   size: {
  //     description: "인풋 크기",
  //     control: { type: "radio" },
  //   },
  // },
};

const Template = (args) => <LoginInput {...args} />;

export const Control = Template.bind({});
Control.args = {
  label: "LoginInput",
};
