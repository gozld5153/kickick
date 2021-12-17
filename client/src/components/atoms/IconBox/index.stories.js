import React from "react";
import IconBox from "./";

export default {
  title: "atoms/IconBox",
  component: IconBox,
  argTypes: {
    label: {
      options: ["arrow", "heart", "edit", "user", "count"],
      control: { type: "radio" },
    },
  },
};

const Template = (args) => <IconBox {...args} />;

export const Control = Template.bind({});
Control.args = {
  label: "arrow",
};
