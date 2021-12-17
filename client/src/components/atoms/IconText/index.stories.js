import React from "react";
import IconText from "./";

export default {
  title: "Atoms/IconText",
  component: IconText,
  argTypes: {
    label: {
      description: "라벨이름",
      options: [
        "제목",
        "글쓴이",
        "태그",
        "최신",
        "인기",
        "학습",
        "여가",
        "생활",
        "예술",
        "경제",
        "여행",
      ],
      control: { type: "radio" },
    },
  },
};

const Template = (args) => <IconText {...args} />;

export const Control = Template.bind({});
Control.args = {
  label: "제목",
};
