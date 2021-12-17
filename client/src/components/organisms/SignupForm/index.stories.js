import React from "react";
import SignupForm from "./";

export default {
  title: "organisms/SignupForm",
  component: SignupForm,
  // argTypes: {
  //   size: {
  //     description: "인풋 크기",
  //     control: { type: "radio" },
  //   },
  // },
};

const Template = (args) => <SignupForm {...args} />;

export const Control = Template.bind({});
Control.args = {
  label: "SignupForm",
};
