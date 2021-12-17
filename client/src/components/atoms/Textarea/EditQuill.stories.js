import React from "react";
import EditQuill from "./EditQuill";

export default {
  title: "atoms/Textarea/EditQuill",
  component: EditQuill,
  argTypes: {
    image: {
      options: [true, false],
      control: { type: "radio" },
    },
  },
};

const Template = (args) => <EditQuill {...args} />;

export const Control = Template.bind({});
Control.args = {
  image: true,
};
