import React from "react";
import EventPost from "./EventPost";

export default {
  title: "molecules/Card/EventPost",
  component: EventPost,
  argTypes: {},
};

const Template = (args) => <EventPost {...args} />;

export const Control = Template.bind({});
Control.args = {};
