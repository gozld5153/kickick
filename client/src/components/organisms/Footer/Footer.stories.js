import React from "react";
import Footer from "./"

export default {
  title: "organisms/Footer",
  component: Footer,
  // argTypes: {
  //   size: {
  //     description: "인풋 크기",
  //     control: { type: "radio" },
  //   },
  // },
};

const Template = (args) => <Footer {...args} />;

export const Control = Template.bind({});
Control.args = {
  label: "Footer",
};
