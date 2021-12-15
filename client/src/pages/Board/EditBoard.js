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
  TagInput,
  IconBox,
  Profile,
} from "../../components";

import {
  getCategoryAction,
  resetPostAddAction,
} from "../../store/actions/postadd";
import { createPost, createTag } from "../../apis/posts";

export default function EditBoard({ themeCode }) {
  const { category } = useParams();
  const navigate = useNavigate();
  const { postAdd, login } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [tagArr, setTagArr] = useState([]);
  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleMovePage = () => {
    navigate(`/board/${category}`);
  };

  const handleClick = () => {
    createPost(postAdd.category, title, content)
      .then((data) => {
        createTag(data.data.data.post_id, [category, ...tagArr])
          .then(() => navigate(`/board/${category}`))
          .catch((err) => console.log(err.response));
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    dispatch(resetPostAddAction());
    dispatch(getCategoryAction(category));
  }, [category, dispatch]);

  return (
    <Container>
      <QullContainer>
        <WriteBox>
          <TitleInput handleChange={handleChange} type="title" />
          <TagInput tagArr={tagArr} setTagArr={setTagArr} category={category} />
          <EditQuill
            image={false}
            content={content}
            setContent={setContent}
            themeCode={themeCode}
          />
          <BtnContainer>
            <IconBox label="arrow" handleClick={handleMovePage} />
            <Common label="등 록" type="bigger" handleClick={handleClick} />
          </BtnContainer>
        </WriteBox>

        <ViewBox>
          <TitleBox>{title}</TitleBox>
          <ProfileContainer>
            <Profile type="post" src={login.isLogin.profile} />
            <span>{login.isLogin.username}</span>
          </ProfileContainer>
          <TagInput
            tagArr={tagArr}
            setTagArr={setTagArr}
            category={category}
            readOnly={true}
          />
          <ReactQuill
            value={content}
            readOnly={true}
            theme={"bubble"}
            style={{
              paddingTop: "0.5rem",
              color: themeCode === "light" ? "black" : "white",
            }}
          />
        </ViewBox>
      </QullContainer>
    </Container>
  );
}
const Container = styled.div``;
const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const QullContainer = styled.div`
  display: flex;

  > :nth-child(2) {
    border-left: 0.2rem dashed #d8d8d8;
  }
`;

const WriteBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 50%;
  padding: 2rem;

  @media ${({ theme }) => theme.device.notebookS} {
    width: 100%;
  }
`;

const ViewBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 50%;
  padding: 2rem;

  @media ${({ theme }) => theme.device.notebookS} {
    display: none;
  }
`;

const TitleBox = styled.div`
  min-height: 4rem;
  line-height: 1.2;
  padding-top: 0.5rem;
  font-size: 2.8rem;
  font-weight: bold;
  color: ${({ theme }) => theme.color.font};
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
