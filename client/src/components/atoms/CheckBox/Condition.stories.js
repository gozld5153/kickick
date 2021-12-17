import React from "react";
import Condition from "./Condition";

export default {
  title: "atoms/CheckBox/Condition",
  component: Condition,
  // argTypes: {
  //   size: {
  //     description: "인풋 크기",
  //     control: { type: "radio" },
  //   },
  // },
};

const Template = (args) => <Condition {...args} />;

export const Control = Template.bind({});
Control.args = {
  label: "Condition",
};
