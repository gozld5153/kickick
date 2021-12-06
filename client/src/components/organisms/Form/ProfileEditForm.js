import React from "react";
import styled from "styled-components";

import { ProfileInput, Common } from "../../";

const profileInputList = [
  { head: "닉네임", type: "text", placeholder: "닉네임을 입력해주세요" },
  { head: "이메일", type: "email", placeholder: "이메일을 입력해주세요" },
  { head: "내상태", type: "text", placeholder: "내상태을 입력해주세요" },
  { head: "프로필 이미지 ", type: "file" },
];

export default function ProfileEditForm() {
  return (
    <>
      <Container>
        <ListContainer>
          {profileInputList.map((el) => (
            <ProfileInput
              key={el.head}
              head={el.head}
              type={el.type}
              placeholder={el.placeholder}
            />
          ))}
        </ListContainer>
      </Container>
      <Common type="register" label="프로필 수정" />
    </>
  );
}

const Container = styled.div`
  display: flex;
  gap: 5rem;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  flex-wrap: wrap;
  height: 22rem;
`;