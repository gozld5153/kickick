import React from "react";
import Landscape from "./Landscape";

export default {
  title: "atoms/Img/Landscape",
  component: Landscape,
  argTypes: {},
};

const Template = (args) => <Landscape {...args} />;

export const Control = Template.bind({});
Control.args = {};
