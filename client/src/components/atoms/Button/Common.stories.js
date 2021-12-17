import React from "react";
import Common from "./Common";

export default {
  title: "atoms/Button/Common",
  component: Common,
  argTypes: {
    btnType: {
      description: "정렬기준",
      options: ["register", "write", "confirm"],
      control: { type: "radio" },
    },

    label: {
      type: "string",
    },
  },
};

const Template = (args) => <Common {...args} />;

export const Control = Template.bind({});
Control.args = {
  btnType: "register",
  label: "글쓰기",
};
