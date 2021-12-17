import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

export default function Textarea({
  handleClick,
  value,
  handleChange,
  themeCode,
  ...props
}) {
  const login = useSelector((state) => state.login);

  return (
    <Container>
      <TextArea
        placeholder={
          login.isLogin ? "댓글을 입력해 주세요." : "로그인 후 사용가능합니다."
        }
        {...props}
        onChange={handleChange}
        value={value}
        login={login.isLogin}
        themeCode={themeCode}
      />
      <p>{value.length} / 200</p>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  p {
    color: #c8c8c8;
    position: absolute;
    right: 1rem;
    bottom: 1rem;
  }
`;
const TextArea = styled.textarea`
  min-width: 100%;
  height: 7rem;
  padding: 1rem;

  border-radius: 5px;
  border: 2px solid #eeeeee;
  background: ${({ theme }) => theme.color.back};

  color: ${({ theme }) => theme.color.font};
  font-size: 1rem;
  resize: none;

  pointer-events: ${({ login }) => (login ? null : "none")};

  &:focus {
    border: ${({ themeCode }) =>
      themeCode === "light" ? "2px solid skyblue" : "2px solid #eeeeee"};
  }

  @media ${({ theme }) => theme.device.mobileL} {
    font-size: 0.8rem;
  }
`;
