import React from "react";
import ConditionChamber from "./ConditionChamber";

export default {
  title: "molecules/InputBox/ConditionChamber",
  component: ConditionChamber,
  // argTypes: {
  //   size: {
  //     description: "인풋 크기",
  //     control: { type: "radio" },
  //   },
  // },
};

const Template = (args) => <ConditionChamber {...args} />;

export const Control = Template.bind({});
Control.args = {
  label: "ConditionChamber",
};
