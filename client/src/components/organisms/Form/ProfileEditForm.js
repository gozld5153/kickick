import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { ProfileInput, Common, Modal } from "../../../components";

import { putUserInfo, delUserInfo } from "../../../apis/users";
import { uploadSingleImage } from "../../../apis/upload";
import { signOut, duplicationCheck } from "../../../apis/auth";

import { isLoginAction, isPointAction } from "../../../store/actions/login";

import { validation } from "../../../commons/utils/validation";

export default function ProfileEditForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.login);

  const [disabled, setDisabled] = useState(true);
  const [profile, setProfile] = useState();
  const [rawProfile, setRawProfile] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmailMsg, setErrEmailMsg] = useState();
  const [errNameMsg, setErrNameMsg] = useState();
  const [errPWMsg, setErrPWMsg] = useState();
  const [emailDupChecked, setEmailDupChecked] = useState(false);
  const [nameDupChecked, setNameDupChecked] = useState(false);
  const [modal, setModal] = useState(false);

  const handleUsername = (e) => {
    const { message, isValid } = validation("username", e.target.value);
    if (!isValid && e.target.value) {
      setErrNameMsg(message);
    } else {
      setErrNameMsg(null);
    }
    setNameDupChecked(false);
    setDisabled(true);
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    const { message, isValid } = validation("email", e.target.value);
    if (!isValid && e.target.value) {
      setErrEmailMsg(message);
      setEmailDupChecked(false);
    } else {
      setErrEmailMsg(null);
    }
    setEmailDupChecked(false);
    setDisabled(true);
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    const { message, isValid } = validation("password", e.target.value);
    if (!isValid && e.target.value) {
      setErrPWMsg(message);
      setDisabled(true);
    } else {
      setErrPWMsg(null);
      setDisabled(false);
    }

    setPassword(e.target.value);
  };
  const handleProfile = (raw, base64) => {
    setDisabled(false);
    setRawProfile(raw);
    setProfile(base64);
  };

  const profileInputList = [
    {
      head: "?????????",
      type: "text",
      placeholder: "????????? ???????????? ??????????????????",
      value: username,
      handler: handleUsername,
      err: errNameMsg,
      dup: nameDupChecked,
    },
    {
      head: "????????? ",
      type: "email",
      placeholder: "????????? ???????????? ??????????????????",
      value: email,
      handler: handleEmail,
      err: errEmailMsg,
      dup: emailDupChecked,
    },
    {
      head: "???????????? ??????",
      type: "password",
      placeholder: "????????? ??????????????? ??????????????????",
      value: password,
      handler: handlePassword,
      err: errPWMsg,
    },
    {
      head: "????????? ????????? ",
      type: "file",
      value: profile,
      handler: handleProfile,
    },
  ];

  const handleUserInfo = () => {
    if (rawProfile) {
      const formData = new FormData();
      formData.append("img", rawProfile);
      uploadSingleImage(formData, "profile").then((data) => {
        const location = data.data.data.location;
        putUserInfo({ username, profile: location, email, password })
          .then(() => {
            signOut()
              .then(() => {
                dispatch(isLoginAction(false));
                dispatch(isPointAction(false));
                navigate("/login", { replace: true });
              })
              .catch((err) => console.log(err));
            dispatch(
              isLoginAction({
                ...isLogin,
                username: username === "" ? isLogin.username : username,
                profile: location,
                email: email === "" ? isLogin.email : email,
              })
            );
          })
          .catch((err) => console.log(err));
      });
    } else {
      putUserInfo({ username, email, password })
        .then(() => {
          signOut()
            .then(() => {
              dispatch(isLoginAction(false));
              dispatch(isPointAction(false));
              navigate("/login", { replace: true });
            })
            .catch((err) => console.log(err));

          dispatch(
            isLoginAction({
              ...isLogin,
              username: username === "" ? isLogin.username : username,
              email: email === "" ? isLogin.email : email,
            })
          );
        })
        .catch((err) => console.log(err));
    }
  };

  const handleResign = () => {
    delUserInfo()
      .then(() => {
        signOut().then(() => {
          dispatch(isLoginAction(false));
          dispatch(isPointAction(false));
        });
      })
      .catch((err) => console.log(err));
  };

  const handleModal = () => {
    setModal(!modal);
  };

  const handleDupCheck = (type) => {
    if (type === "email") {
      duplicationCheck({ email })
        .then(() => {
          setErrEmailMsg(null);
          setEmailDupChecked(true);
          setDisabled(false);
        })
        .catch((err) => setErrEmailMsg("????????? ??????????????????"));
    } else {
      duplicationCheck({ username })
        .then(() => {
          setErrNameMsg(null);
          setNameDupChecked(true);
          setDisabled(false);
        })
        .catch((err) => setErrNameMsg("????????? ?????????????????????"));
    }
  };
  return (
    <>
      <Container>
        <ListContainer>
          {profileInputList.map((el) => (
            <ProfileContainer key={el.head} type={el.type}>
              <ProfileInput
                head={el.head}
                type={el.type}
                placeholder={el.placeholder}
                value={el.value}
                handler={el.handler}
                err={el.err}
              />
              {(el.type === "email" || el.type === "text") &&
                !el.err &&
                !el.dup &&
                el.value && (
                  <button
                    className="duplication"
                    onClick={() => {
                      handleDupCheck(el.type);
                    }}
                  >
                    ????????????
                  </button>
                )}
            </ProfileContainer>
          ))}
        </ListContainer>
      </Container>
      <Common
        type="mypage"
        label="???????????? ??????"
        handleClick={handleUserInfo}
        disabled={disabled}
      />
      <ResignContainer>
        <h2>????????????</h2>
        <Common type="resign" label="????????????" handleClick={handleModal} />
        {modal && (
          <Modal
            handleModal={handleModal}
            handleModalFunc={handleResign}
            type="resign"
          />
        )}
      </ResignContainer>
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
  gap: 2rem;
  flex-wrap: wrap;
  height: 28rem;

  @media ${({ theme }) => theme.device.notebookS} {
    width: 100%;
  }
  @media ${({ theme }) => theme.device.tablet} {
    height: 45rem;
  }
`;

const ProfileContainer = styled.div`
  position: relative;
  .duplication {
    position: absolute;
    top: 2.7rem;
    right: 1rem;
    font-weight: bold;
    color: #0c0c42;
  }
  ${({ type }) =>
    (type === "text" || type === "email" || type === "password") &&
    css`
      @media ${({ theme }) => theme.device.notebookS} {
        width: 60%;
      }
      @media ${({ theme }) => theme.device.tablet} {
        width: 100%;
      }
    `}
`;

const ResignContainer = styled.div`
  margin-top: 8rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
