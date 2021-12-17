import React from "react";
import styled, { css } from "styled-components";

import default_thumbnail from "../../../assets/images/default/default_thumbnail.jpg";

export default function Thumbnail({ type = "post", src = "picture.jpg" }) {
  return (
    <Container
      type={type}
      src={src === "picture.jpg" || src === null ? default_thumbnail : src}
      alt=""
    />
  );
}

const Container = styled.img`
  ${({ type }) =>
    type === "post" &&
    css`
      object-fit: contain;
      object-position: center top;
      height: 13.5rem;
      opacity: 0.8;
    `}

  ${({ type }) =>
    type === "event" &&
    css`
      object-fit: cover;
      object-position: center top;
      height: 8.5rem;
      opacity: 0.8;
    `}

    ${({ type }) =>
    type === "kick" &&
    css`
      object-fit: contain;
      object-position: center top;
      height: 6rem;
      width: 10rem;
      opacity: 0.8;
    `}
`;
