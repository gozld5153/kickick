import React from "react";
import BtnChamber from "./BtnChamber";

export default {
  title: "molecules/BtnChamber/BtnChamber",
  component: BtnChamber,
  // argTypes: {
  //   size: {
  //     description: "인풋 크기",
  //     control: { type: "radio" },
  //   },
  // },
};

const Template = (args) => <BtnChamber {...args} />;

export const Control = Template.bind({});
Control.args = {
  label: "BtnChamber",
};
