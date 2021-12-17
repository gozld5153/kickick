import React from "react";
import DatePicker from "./DatePicker";

export default {
  title: "atoms/Input/DatePicker",
  component: DatePicker,
  // argTypes: {
  //   size: {
  //     description: "인풋 크기",
  //     control: { type: "radio" },
  //   },
  // },
};

const Template = (args) => <DatePicker {...args} />;

export const Control = Template.bind({});
Control.args = {
  label: "DatePicker",
};
