import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { Profile, Common, IconText } from "../../../components";

import { signOut } from "../../../apis/auth";

import { isLoginAction, isPointAction } from "../../../store/actions/login";

import kakaologo from "../../../assets/images/authlogo/kakaologo.png";
import naverlogo from "../../../assets/images/authlogo/naverlogo.png";
import googlelogo from "../../../assets/images/authlogo/googlelogo.png";
import generallogo from "../../../assets/images/Traveler.png";
import adminlogo from "../../../assets/images/Admin.png";
import generallogo2 from "../../../assets/images/Traveler.png";

const logoList = [
  {
    type: "admin",
    logo: adminlogo,
    color: "#000000",
    text: "관리자로 로그인 중",
  },
  {
    type: "general",
    logo: generallogo,
    color: "#000000",
    text: "이메일로 로그인 중",
  },
  {
    type: "kakao",
    logo: kakaologo,
    color: "#fee500",
    text: "카카오로 로그인 중",
  },
  {
    type: "naver",
    logo: naverlogo,
    color: "#58D62E",
    text: "네이버로 로그인 중",
  },
  {
    type: "google",
    logo: googlelogo,
    color: "#58D62E",
    text: "구글로 로그인 중",
  },
  {
    type: "email auth required",
    logo: generallogo2,
    color: "#58D62E",
    text: "이메일 인증이 필요",
  },
];
export default function MyPageAside() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLogin } = useSelector((state) => state.login);
  const logoFind = logoList.find((el) => el.type === isLogin.type);

  const { logo, color, text } = logoFind;

  const logoutHanlder = () => {
    signOut().then(() => {
      dispatch(isLoginAction(false));
      dispatch(isPointAction(false));
      navigate("/");
    });
  };

  return (
    <Container>
      <ProfileContainer>
        <Profile type="mypage" src={isLogin.profile} />
        <div className="username">
          <strong>{isLogin.username}</strong>님
        </div>
      </ProfileContainer>
      <StatusContainer>
        <LoginStatusContainer>
          <div>
            <IconText label="생일" />
            <span>{isLogin.birthday}</span>
          </div>
          <div>
            <IconText label="이메일" />
            <span>{isLogin.email}</span>
          </div>
        </LoginStatusContainer>
      </StatusContainer>
      <AuthContainer>
        <LoginLogo color={color}>
          <img className="logo" src={logo} alt="" />
          <span>{text}</span>
        </LoginLogo>
        <Common label="로그아웃" type="new" handleClick={logoutHanlder} />
      </AuthContainer>
    </Container>
  );
}

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  width: 20%;

  @media ${({ theme }) => theme.device.notebookS} {
    flex-direction: row;

    width: 100%;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  padding: 2rem 2rem 0 2rem;

  strong {
    font-size: 1.2rem;
  }

  .username {
    width: 8rem;
    word-wrap: break-word;
  }

  @media ${({ theme }) => theme.device.notebookS} {
    flex-direction: row;
  }
`;
const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 2rem;
  font-size: 0.9rem;
  color: gray;
  gap: 2rem;

  @media ${({ theme }) => theme.device.notebookS} {
    border-top: none;
    flex-direction: row;
  }
`;

const LoginStatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  span {
    margin-left: 0.5rem;
    font-style: italic;
    font-size: 0.8rem;
  }
`;
const LoginLogo = styled.div`
  display: flex;
  align-items: center;
  height: 2.2rem;

  img {
    border-radius: 50%;
    width: 1.8rem;
    margin-right: 0.2rem;
  }
  span {
    font-size: 0.9rem;
    font-style: normal;
    font-weight: bold;
  }
`;

const AuthContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  border-top: 2px dashed #d8d8d8;

  padding: 1rem;
  gap: 0.5rem;
  @media ${({ theme }) => theme.device.notebookS} {
    padding-top: 2rem;
    border-top: none;
    flex-direction: row;
    justify-content: center;
  }
`;
