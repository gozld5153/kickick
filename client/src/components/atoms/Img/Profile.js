import React from "react";
import styled from "styled-components";
import default_profile from "../../../assets/images/default/default_profile.jpg";

const profileList = [
  { type: "comment", size: "1.5rem" },
  { type: "post", size: "1.5rem" },
  { type: "confirm", size: "2rem" },
  { type: "mypage", size: "5rem" },
  { type: "mypageedit", size: "7rem" },
];

export default function Profile({ type, src = "picture.jpg" }) {
  const { size } = profileList.find((i) => i.type === type);
  return (
    <Container
      size={size}
      src={src === "picture.jpg" || src === null ? default_profile : src}
      alt=""
    />
  );
}

const Container = styled.img`
  width: ${({ size }) => size};
  height: ${({ size }) => size};

  border-radius: 50%;
`;
