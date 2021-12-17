import React from "react";
import ProfileInput from "./ProfileInput";

export default {
  title: "molecules/InputBox/ProfileInput",
  component: ProfileInput,
  argTypes: {},
};

const Template = (args) => <ProfileInput {...args} />;

export const Control = Template.bind({});
Control.args = {};
