import React from "react";

import Select from "./";

export default {
  title: "Molecules/Select",
  component: Select,
};

const Template = (args) => <Select {...args} />;

export const Control = Template.bind({});
Control.args = {
  icon: { label: "제목" },
};
