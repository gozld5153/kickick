import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import disableScroll from "disable-scroll";

import Profile from "../../atoms/Img/Profile";
import { IconBox, Modal } from "../../";
import { dateConverter } from "../../../commons/utils/dateConverter";

export default function PostCommentItem({ item, handleDelComment }) {
  const userInfo = useSelector((state) => state.login.isLogin);
  const { postInfo } = useSelector((state) => state.persist);
  const [modal, setModal] = useState(false);

  const handleModalOn = () => {
    setModal(true);
    disableScroll.on();
  };

  const handleModalOff = () => {
    setModal(false);
    disableScroll.off();
  };

  const hadleModalFunc = () => {
    setModal(false);
    disableScroll.off();
    handleDelComment(item.comment_id);
  };

  return (
    <Container>
      <UserInfoContainer>
        <Profile type="post" />
        <span className="username">{item.user.username}</span>
        {postInfo.user.username === item.user.username && (
          <span className="writer">(글쓴이)</span>
        )}
        <span className="datetime">{dateConverter(item.created_at)}</span>
        {userInfo.username === item.user.username ||
        userInfo.type === "admin" ? (
          <Del>
            <IconBox label="cmtDel" handleClick={handleModalOn}></IconBox>
          </Del>
        ) : null}
      </UserInfoContainer>
      <p
        className={
          postInfo.user.username === item.user.username
            ? "comment mycomment"
            : "comment"
        }
      >
        {item.content}
      </p>
      {modal ? (
        <Modal
          handleModal={handleModalOff}
          handleModalFunc={hadleModalFunc}
          type="del"
        />
      ) : null}
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;

  font-size: 1rem;

  .comment {
    width: 100%;
    margin: 1rem 0;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.color.font};
    word-break: break-all;
    line-height: 1.2;
  }

  .mycomment {
    /* font-weight: bold; */
    /* color: ${({ theme }) => theme.color.mycomment}; */
  }

  & + & {
    border-top: 1px solid #eeeeee;
  }
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  line-height: 2;

  .username {
    margin-left: 0.5rem;
    color: ${({ theme }) => theme.color.font};
    @media ${({ theme }) => theme.device.mobileL} {
      font-size: 0.8rem;
    }
  }

  .datetime {
    color: gray;
    margin-left: 1rem;
    font-size: 0.8rem;
  }

  .writer {
    font-weight: bold;
    font-size: 0.8rem;
    margin-left: 0.5rem;
    color: ${({ theme }) => theme.color.mycomment};
  }
`;

const Del = styled.div`
  width: 2rem;
  height: 2rem;
  color: #a8a8a8;
  margin-left: auto;
`;
