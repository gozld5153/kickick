import React from "react";
import SignupInputBox from "./SignupInputBox";

export default {
  title: "molecules/InputBox/SignupInputBox",
  component: SignupInputBox,
  // argTypes: {
  //   size: {
  //     description: "인풋 크기",
  //     control: { type: "radio" },
  //   },
  // },
};

const Template = (args) => <SignupInputBox {...args} />;

export const Control = Template.bind({});
Control.args = {
  label: "SignupInputBox",
};
