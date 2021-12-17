import React from "react";
import styled from "styled-components";

import sampleImg from "../../../assets/images/space_background.jpg";

export default function Landscape() {
  return <Container image={sampleImg} alt="" />;
}

const Container = styled.div`
  width: 100%;
  height: 15rem;
  background-image: url(${({ image }) => image});
`;
