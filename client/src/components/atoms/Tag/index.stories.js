import React from "react";
import Tag from "./";

export default {
  title: "atoms/Tag",
  component: Tag,
  argTypes: {
    label: {
      description: "검색태그",
      options: ["태그", "제목", "글쓴이"],
      control: { type: "radio" },
    },
  },
};

const Template = (args) => <Tag {...args} />;

export const Control = Template.bind({});
Control.args = {
  label: "태그",
};
