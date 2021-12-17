import React from "react";
import styled from "styled-components";

import { Common, Textarea } from "../../";

export default function PostCommentInput({
  handleClick,
  value,
  handleChange,
  themeCode,
}) {
  return (
    <Container>
      <Textarea
        value={value}
        handleChange={handleChange}
        themeCode={themeCode}
      />
      <CommentButtons>
        <Common label="댓글등록" type="register" handleClick={handleClick} />
      </CommentButtons>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${1.5 * 0.5}rem;
`;
