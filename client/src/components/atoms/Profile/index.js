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

export default function Profile({ type, src = "picture.jpg", username }) {
  const { size } = profileList.find((i) => i.type === type);
  return (
    <Container>
      <Image
        size={size}
        src={src === "picture.jpg" || src === null ? default_profile : src}
        alt=""
      />
      <span>{username}</span>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 8rem;
  }
`;
const Image = styled.img`
  margin-right: 0.5rem;

  width: ${({ size }) => size};
  height: ${({ size }) => size};

  border-radius: 50%;
`;
