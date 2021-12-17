import React from "react";
import SignupInput from "./SignupInput";

export default {
  title: "atoms/Input/SignupInput",
  component: SignupInput,
  // argTypes: {
  //   size: {
  //     description: "인풋 크기",
  //     control: { type: "radio" },
  //   },
  // },
};

const Template = (args) => <SignupInput {...args} />;

export const Control = Template.bind({});
Control.args = {
  label: "SignupInput",
};
