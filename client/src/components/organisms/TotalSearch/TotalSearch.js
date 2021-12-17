import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import disableScroll from "disable-scroll";
import { useLocation, useNavigate } from "react-router";
import {
  Align,
  Select,
  SearchInput,
  Tag,
  Common,
  Modal,
} from "../../../components";

import {
  boardAlignAction,
  titleSearchAction,
  writerSearchAction,
  tagSearchAction,
  resetPaginationAction,
} from "../../../store/actions/postsearch";

import { addTagAction, delTagAction } from "../../../store/actions/postadd";

export default function TotalSearch({ type }) {
  const { pathname } = useLocation();
  const [page, category] = decodeURI(pathname).slice(1).split("/");
  const navigate = useNavigate();
  const { isLogin } = useSelector((state) => state.login);
  const [modal, setModal] = useState(false);
  const stateTag = useSelector((state) => state.tag);
  const dispatch = useDispatch();

  const [isSelect, setIsSelect] = useState(false);
  const [icon, setIcon] = useState({ label: "제목" });
  const [word, setWord] = useState("");

  const handleAlign = (event) => {
    const label = event.target.innerText;
    dispatch(boardAlignAction(label));
    dispatch(resetPaginationAction());
  };
  const handleIcon = (label) => {
    setIcon(label);
    setIsSelect(!isSelect);
  };
  const handleSearch = () => {
    dispatch(addTagAction(icon.label, word));
    dispatch(resetPaginationAction());
    setWord("");

    if (icon.label === "제목") {
      dispatch(titleSearchAction(word));
    } else if (icon.label === "글쓴이") {
      dispatch(writerSearchAction(word));
    } else if (icon.label === "태그") {
      dispatch(tagSearchAction(word));
    }
  };

  const handleInput = (e) => {
    setWord(e.target.value);
  };
  const handleClick = (idx, label) => {
    dispatch(delTagAction(idx));
    dispatch(resetPaginationAction());

    if ("제목" === label) {
      dispatch(titleSearchAction());
    } else if ("글쓴이" === label) {
      dispatch(writerSearchAction());
    } else if ("태그" === label) {
      dispatch(tagSearchAction());
    }
  };

  const handleModalOff = () => {
    setModal(false);
    disableScroll.off();
  };

  const handleModalFunc = () => {
    setModal(false);
    disableScroll.off();
    navigate("/login");
  };

  const handleMovePage = () => {
    if (
      !isLogin ||
      isLogin.type === "email auth required" ||
      isLogin.type === "guest"
    ) {
      setModal(true);
      disableScroll.on();
    } else {
      if (type === "kick") {
        navigate(`/editkick/${category}`);
      } else {
        navigate(`/editboard/${category}`);
      }
    }
  };

  const handleDisableScroll = () => {
    disableScroll.off();
  };

  useEffect(() => {
    window.addEventListener("popstate", handleDisableScroll);
    return () => window.removeEventListener("popstate", handleDisableScroll);
  }, []);

  return (
    <>
      <Container>
        <Align handleAlign={handleAlign} />
        <Common type="register" label="글쓰기" handleClick={handleMovePage} />
        <SearchContainer>
          <Select
            icon={icon}
            handleIcon={handleIcon}
            isSelect={isSelect}
            setIsSelect={setIsSelect}
          />
          <SearchInput
            handleSearch={handleSearch}
            handleInput={handleInput}
            word={word}
          />
        </SearchContainer>
      </Container>
      <TagContainer>
        {stateTag.map((el, idx) => (
          <Tag
            key={el.label}
            label={el.label}
            detail={el.word}
            handleClick={() => handleClick(idx, el.label)}
          />
        ))}
      </TagContainer>
      {modal ? (
        <Modal
          handleModal={handleModalOff}
          handleModalFunc={handleModalFunc}
          type={isLogin.type === "email auth required" ? "email" : "login"}
        />
      ) : null}
    </>
  );
}
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 1rem 1rem 1rem;
  align-items: center;
`;
const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 2.5rem;
  margin: 0 1rem 1rem 1rem;
  gap: 1rem;
`;
const SearchContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: 1.5rem;
  @media ${({ theme }) => theme.device.tablet} {
    width: 200%;
    height: 8rem;
    margin: 1rem 0;
    justify-content: center;
    align-items: center;
    background-color: #eeeeee;
    border-radius: 20px;
    > div:nth-of-type(2) {
      width: 40%;
      input {
        font-size: 0.8rem;
      }
    }
  }
`;
