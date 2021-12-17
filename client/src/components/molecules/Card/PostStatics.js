import React from "react";
import styled from "styled-components";

export default function PostStatics({ type, num }) {
  return (
    <Container>
      <div className="boxname">{type} 글</div>
      <div className="postnum">
        <strong>{num}</strong> 개
      </div>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 0;

  border-radius: 0.1rem;
  padding: 2rem;

  & + & {
    border-left: 1px solid #eeeeee;
  }

  .boxname {
    font-size: 0.9rem;
    color: gray;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .postnum {
    font-size: 1.5rem;
    font-weight: bold;

    strong {
      font-size: 4rem;
    }
  }
`;
