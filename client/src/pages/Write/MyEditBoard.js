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
  Spinner,
} from "../../components";
import Page404 from "../Error/Page404";
import { getPostInfoAction } from "../../store/actions/postinfo";
import { getPostsInfo, putPost } from "../../apis/posts";
import { delTags, createTags } from "../../apis/tags";

export default function MyEditBoard({ themeCode, list }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post_id, category } = useParams();
  const state = useSelector((state) => state.persist.postInfo);
  const { postAdd, login } = useSelector((state) => state);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState(state.post_name);
  const [content, setContent] = useState(state.content);
  const [tagArr, setTagArr] = useState(
    state.tags.filter((el) => el.content !== category).map((el) => el.content)
  );

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleQuill = () => {
    setContent(content);
  };

  const handleClick = () => {
    putPost(postAdd.category, title, content, null, post_id)
      .then(() => {
        state.tags
          .filter((el) => el.content !== category)
          .forEach((tag) => {
            delTags(post_id, tag.tag_id).catch((err) => err.response);
          });
      })
      .then(() => {
        createTags(post_id, [category, ...tagArr])
          .then(() => navigate(`/detailboard/${post_id}`))
          .catch((err) => console.log(err.response));
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    getPostsInfo(post_id)
      .then((data) => {
        dispatch(getPostInfoAction(data.data.data));
      })
      .then(setLoading(false))
      .catch((err) => console.log(err.response));
  }, [dispatch, post_id]);

  if (!list.find((el) => el === category)) return <Page404 />;
  if (loading) return <Spinner />;

  return (
    <Container>
      <QullContainer>
        <WriteBox>
          <TitleInput handleChange={handleChange} type="title" title={title} />
          <TagInput tagArr={tagArr} setTagArr={setTagArr} category={category} />
          <EditQuill
            image={false}
            content={content}
            setContent={setContent}
            handleQuill={handleQuill}
            themeCode={themeCode}
          />
          <BtnContainer>
            <IconBox
              label="arrow"
              handleClick={() => navigate(`/detailboard/${post_id}`)}
            />
            <Common label="수 정" type="bigger" handleClick={handleClick} />
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
              color: themeCode === "light" ? "#222" : "#fff",
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
