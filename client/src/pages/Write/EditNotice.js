import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

import {
  EditQuill,
  TitleInput,
  Common,
  IntroTextarea,
  DragDrop,
  Thumbnail,
  Profile,
  Spinner,
} from "../../components";

import { createNotices } from "../../apis/notices";
import { uploadSingleImage } from "../../apis/upload";

import {
  getCategoryAction,
  getPostNameAction,
  getContentAction,
  getMainContentAction,
  resetPostAddAction,
} from "../../store/actions/postadd";

import {
  noticeSocketAction,
  eventSocketAction,
} from "../../store/actions/socket";

export default function EditNotice() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category } = useParams();
  const { postAdd, login, themeMode } = useSelector((state) => state);
  const [postname, setPostname] = useState("");
  const [intro, setIntro] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState();
  const [file, setFile] = useState();
  const [disabed, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePostName = (e) => {
    dispatch(getPostNameAction(e.target.value));
  };
  const handleViewPostName = (e) => {
    setPostname(e.target.value);
  };
  const handleViewIntro = (e) => {
    setIntro(e.target.value);
  };
  const handleIntro = (e) => {
    dispatch(getContentAction(e.target.value));
  };

  const handleContent = () => {
    dispatch(getMainContentAction(content));
  };

  const handleClick = () => {
    setDisabled(true);
    setLoading(true);
    if (thumbnail) {
      const formData = new FormData();
      formData.append("img", thumbnail);
      uploadSingleImage(formData, "post").then((data) => {
        const location = data.data.data.location;
        createNotices({
          type: category === "이벤트" ? "events" : "notices",
          notice_name: postname,
          summary: postAdd.content,
          thumbnail: location,
          content: content,
        })
          .then(() =>
            dispatch(
              category === "이벤트"
                ? eventSocketAction(true)
                : noticeSocketAction(true)
            )
          )
          .then(() =>
            dispatch(
              category === "이벤트"
                ? eventSocketAction(false)
                : noticeSocketAction(false)
            )
          )
          .then(() => setLoading(true))
          .then(() => navigate(`/notice/${category}`))
          .catch((err) => console.log(err));
      });
    }
  };

  useEffect(() => {
    dispatch(resetPostAddAction());
    dispatch(getCategoryAction(category));
  }, [dispatch, category]);
  if (loading) return <Spinner />;
  return (
    <Container>
      <WritePage>
        <InfoContainer>
          <TitleInput
            type="title"
            handleChange={handleViewPostName}
            handlePostName={handlePostName}
          />
        </InfoContainer>
        <InfoContainer>
          <h3>썸네일</h3>
          <DragDrop file={file} setFile={setFile} setThumbnail={setThumbnail} />
        </InfoContainer>
        <InfoContainer>
          <h3>공지 소개글</h3>
          <IntroTextarea
            handleViewIntro={handleViewIntro}
            handleTextarea={handleIntro}
          />
        </InfoContainer>
        <InfoContainer>
          <h3>본문</h3>
          <EditQuill
            content={content}
            setContent={setContent}
            handleContent={handleContent}
            themeCode={themeMode[1]}
          />
        </InfoContainer>

        <BtnContainer>
          <Common
            label="등 록"
            type="bigger"
            handleClick={handleClick}
            disabled={disabed}
          />
        </BtnContainer>
      </WritePage>
      <ViewPage>
        <h1>{postname}</h1>
        <Thumbnail src={file} alt="" />
        <ProfileContainer>
          <Profile type="post" src={login.isLogin.profile} />
          <span>{login.isLogin.username}</span>
        </ProfileContainer>
        <blockquote>{intro}</blockquote>
        <ReactQuill
          readOnly={true}
          theme={"bubble"}
          value={content}
          style={{
            backgroundColor: themeMode[1] === "light" ? "#eee" : "#1E1F21",
            padding: "1rem 0",
            borderRadius: "0.5rem",
            height: "40rem",
            color: themeMode[1] === "light" ? "black" : "white",
          }}
        />
      </ViewPage>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  padding: 1rem;
`;
const WritePage = styled.div`
  width: 50%;

  display: flex;
  flex-direction: column;
  padding: 0 4rem;
  gap: 0.5rem;

  @media ${({ theme }) => theme.device.notebookS} {
    width: 100%;
  }
`;

const ViewPage = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  padding: 0 4rem;
  gap: 0.5rem;
  border-left: 3px dashed #eee;

  > h1 {
    font-size: 2.8rem;
    height: 4.5rem;
    padding: 0.5rem;
    color: ${({ theme }) => theme.color.font};
  }

  > img {
    object-fit: scale-down;
    height: 20rem;
    width: 100%;
  }
  > blockquote {
    font-size: 1.2rem;
    font-style: italic;
    color: ${({ theme }) => theme.color.blockquoteColor};
    padding: 1.5rem;
    background: ${({ theme }) => theme.color.blockquote};
    border-left: 3px solid ${({ theme }) => theme.color.alarm};
    margin: 1rem 0;
    min-height: 5rem;
    line-height: 1.5;
  }

  @media ${({ theme }) => theme.device.notebookS} {
    display: none;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  gap: 0.5rem;

  h3 {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.color.font};
    margin-right: 1rem;
  }
`;

const BtnContainer = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  color: ${({ theme }) => theme.color.font};
  img {
    margin-right: 1rem;
  }
`;
