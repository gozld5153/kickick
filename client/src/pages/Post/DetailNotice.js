import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

import { Thumbnail, Profile } from "../../components";

import { getNoticesInfo } from "../../apis/notices";
import { getPostInfoAction } from "../../store/actions/postinfo";

export default function DetailNotice({ themeCode }) {
  const { notice_id } = useParams();
  const dispatch = useDispatch();
  const { postInfo } = useSelector((state) => state.persist);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNoticesInfo(notice_id).then((data) => {
      dispatch(getPostInfoAction(data.data.data));
      setLoading(false);
    });
  }, [notice_id, dispatch]);

  if (loading) return <div></div>;
  return (
    <NoticeDetailContainer>
      <NoticeDetailInfo>
        <Thumbnail src={postInfo.thumbnail} alt="" />
        <h2>{postInfo.notice_name}</h2>
        <SubInfoContainer>
          <Profile src={postInfo.user.profile} type="post" />
          <span>{postInfo.user.username}</span>
          <span>{postInfo.created_at}</span>
        </SubInfoContainer>
      </NoticeDetailInfo>
      <NoticeDetailContent>
        <ReactQuill
          readOnly={true}
          theme={"bubble"}
          value={postInfo.content}
          style={{ color: themeCode === "light" ? "#222" : "#fff" }}
        />
      </NoticeDetailContent>
    </NoticeDetailContainer>
  );
}

const NoticeDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 48rem;
  margin: 0 auto;

  h2 {
    font-size: 2rem;
  }

  span {
    margin-right: 1rem;
    color: gray;
  }

  @media ${({ theme }) => theme.device.notebookS} {
    width: 48rem;
  }
  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
  }
`;

const NoticeDetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  h2 {
    color: ${({ theme }) => theme.color.font};
  }
`;

const NoticeDetailContent = styled.div`
  min-height: 30rem;
  background-color: ${({ theme }) => theme.color.noticeBack};
`;

const SubInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
