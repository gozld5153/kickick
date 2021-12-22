import React from "react";
import { useLocation,useNavigate } from "react-router-dom"
import styled from "styled-components";
import disableScroll from "disable-scroll";


import { FirstEnter, Calendar } from "../../../components";

export default function CommonModal() {
  const location = useLocation();
  const navigate = useNavigate();
  const modalName = location.pathname.split("/")[2];

  disableScroll.on();

  const closeHanlder = () => {
    if (modalName === "calendar") {
      disableScroll.off();
      navigate("/",{replace:true})
    }
  }
  return (
    <Container onClick={closeHanlder}>
      {modalName === "firstenter" ? (
        <FirstEnter />
      ) : modalName === "calendar" ? (
        <Calendar />
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  position:fixed;
  top:0;
  left:0;
  display:flex;
  justify-content:center;
  align-items:center;
  width:100vw;
  height:100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index:9999999;
`;
