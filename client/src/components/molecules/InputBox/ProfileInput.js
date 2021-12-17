import React from "react";
import styled, { css } from "styled-components";

import { Profile } from "../../../components";

import { fileReader } from "../../../commons/utils/fileReader";

export default function ProfileInput({
  head,
  type,
  placeholder,
  handler,
  value,
  err,
}) {
  if (type === "file")
    return (
      <Container>
        <h3>{head}</h3>
        <Profile type="mypageedit" src={value} />
        <form>
          <input
            id="file"
            type="file"
            accept="image/*"
            onChange={(e) => fileReader(e, handler)}
            style={{ display: "none" }}
          />
          <label htmlFor="file">이미지 수정</label>
        </form>
      </Container>
    );

  return (
    <Container err={err}>
      <h3>{head}</h3>
      <input
        value={value}
        onChange={handler}
        type={type}
        placeholder={placeholder}
      />
      <ErrorBox>{err}</ErrorBox>
    </Container>
  );
}

const Container = styled.div`
  h3 {
    font-size: 0.9rem;
    margin-bottom: 1rem;
    font-weight: bold;
  }

  input {
    width: 30rem;
    height: 3rem;
    background-color: #eeeeee;
    border: 2px solid #dddddd;
    border-radius: 10px;
    padding: 0.5rem 1rem;
    font-size: 1.1rem;
    ::placeholder {
      font-style: italic;
      font-size: 0.85rem;
    }
    &:focus {
      border: 2px solid #45aa00;
      ${({ err }) =>
        err &&
        css`
          border: 2px solid #ff5555;
        `}
    }

    @media ${({ theme }) => theme.device.notebookS} {
      width: 100%;
      margin: 0 auto;
    }
  }

  label {
    position: relative;
    left: 2.5rem;
    top: -0.5rem;
    border: 1px solid #ddd;
    padding: 0.5rem;
    border-radius: 0.5rem;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      background: #ddd;
    }
  }
  img {
    margin: 2rem;
  }
`;

const ErrorBox = styled.div`
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  height: 2rem;
  font-size: 0.9rem;
  color: #ff5555;
`;
