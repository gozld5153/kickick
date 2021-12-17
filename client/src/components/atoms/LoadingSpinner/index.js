import React from "react";
import styled, { keyframes } from "styled-components";

export default function Spinner() {
  return (
    <Container>
      <div className="solar-system">
        <div className="jupiter-orbit orbit">
          <div className="planet jupiter"></div>
          <div className="mars-orbit orbit">
            <div className="planet mars"></div>
            <div className="earth-orbit orbit">
              <div className="planet earth"></div>
              <div className="venus-orbit orbit">
                <div className="planet venus"></div>
                <div className="mercury-orbit orbit">
                  <div className="planet mercury"></div>
                  <div className="sun"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const spin = keyframes`
  from {
    transform: rotate(0);
  }
  to{
    transform: rotate(359deg);
  }
`;
const Container = styled.div`
  .solar-system {
    display: flex;
    height: 60vh;
    justify-content: center;
    align-items: center;
  }

  .orbit {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;
    border-radius: 50%;
  }

  .jupiter-orbit {
    width: 275px;
    height: 275px;
    animation: ${spin} 4.5s linear 0s infinite;
  }
  .mars-orbit {
    width: 205px;
    height: 205px;
    animation: ${spin} 4.3s linear 0s infinite;
  }
  .earth-orbit {
    width: 165px;
    height: 165px;
    animation: ${spin} 4s linear 0s infinite;
  }

  .venus-orbit {
    width: 120px;
    height: 120px;
    animation: ${spin} 3.6s linear 0s infinite;
  }

  .mercury-orbit {
    width: 90px;
    height: 90px;
    animation: ${spin} 3s linear 0s infinite;
  }

  .planet {
    position: absolute;
    top: -5px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #3ff9dc;
  }

  .jupiter {
    top: -15px;
    width: 35px;
    height: 35px;
    background-color: #dcbd78;
  }
  .mars {
    background-color: #f01a16;
  }
  .sun {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #f29049;
  }

  .earth {
    width: 15px;
    height: 15px;
    background-color: #5070b6;
  }
  .venus {
    width: 14px;
    height: 14px;
    background-color: #d04d36;
  }
  .mercury {
    background-color: #4aa6c1;
  }
`;
