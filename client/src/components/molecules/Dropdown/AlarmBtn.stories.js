import React from "react";
import AlarmBtn from "./AlarmBtn";

export default {
  title: "molecules/Dropdown/AlarmBtn",
  component: AlarmBtn,
  // argTypes: {
  //   size: {
  //     description: "인풋 크기",
  //     control: { type: "radio" },
  //   },
  // },
};

const Template = (args) => <AlarmBtn {...args} />;

export const Control = Template.bind({});
Control.args = {
  label: "AlarmBtn",
};
