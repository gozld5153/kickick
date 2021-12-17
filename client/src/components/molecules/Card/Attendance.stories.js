import React from "react";
import Attendance from "./Attendance";

export default {
  title: "molecules/Card/Attendance",
  component: Attendance,
  argTypes: {},
};

const Template = (args) => <Attendance {...args} />;

export const Control = Template.bind({});
Control.args = {};
